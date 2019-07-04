'use strict';

import GoodsGroupModel from '../models/goods_group'
import baseComponent from '../prototype/baseComponent'
import formidable from 'formidable'


class Goods extends baseComponent {
	constructor() {
		super()
		this.save = this.save.bind(this)
	}
	async save(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					status: false,
					message: '表单信息错误'
				})
				return
			}
			const { specific, parentId, groupName, groupImg, isRecom } = fields;
			try {
				if (specific == 2 && !parentId) {
					throw new Error('请选择二级分组')
				} else if (!groupName) {
					throw new Error('请输入分组名称')
				}
			} catch (err) {
				res.send({
					status: false,
					message: err.message,
				})
				return
			}
            try {
                const check = await GoodsGroupModel.findOne({ groupName })
                if (check) {
					res.send({
						status: false,
						message: '分组名称已经存在',
                    })
                    return false
				}

				if(parentId){
					const checkgroupId = await GoodsGroupModel.findOne({ groupName })
					if (!checkgroupId) {
						res.send({
							status: false,
							message: '分组ID错误',
						})
						return false
					}
				}

                await GoodsGroupModel.create(fields)
                res.send({
                    status: true,
                    message: '分组添加成功',
                })
            } catch(err){
                res.send({
					status: false,
					message: err.message,
				})
				return
            }
	
		})
    }
    async list (req, res, next){
        const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					status: false,
					message: '表单信息错误'
				})
				return
            }

            try{
                let data = await GoodsGroupModel.find()
                res.send({
                    status: false,
                    data: data,
					message: '获取列表成功'
				})
            } catch(err){
                res.send({
					status: false,
					message: err.message
				})
				return
            }
        })
	}
}

export default new Goods()