'use strict';

import TagModel from '../models/goods_tag'
import baseComponent from '../prototype/baseComponent'
import formidable from 'formidable'


class Tag extends baseComponent {
	constructor() {
		super()
		this.save = this.save.bind(this)
	}
	async save(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					code: 0,
					message: '表单信息错误'
				})
				return
			}
			const { tagName } = fields;
			try {
				if (!tagName) {
					throw new Error('标签名称不能为空')
				}
			} catch (err) {
				res.send({
					code: 0,
					message: err.message,
				})
				return
			}
            try {
                const check = await TagModel.findOne({ tagName })
                if (check) {
					res.send({
						code: 0,
						message: '标签名称已经存在',
                    })
                    return false
                }
                await TagModel.create({
					tagName:tagName
				})
                res.send({
                    code: 1,
                    message: '标签添加成功',
                })
            } catch(err){
                res.send({
					code: 0,
					message: err.message,
				})
				return
            }
	
		})
	}
	async del(req, res, next){
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					code: 0,
					message: '表单信息错误'
				})
				return
            }

			try{
				console.log(fields)
                let data = await TagModel.remove({ _id: { $in: fields.delArr } })
                res.send({
                    code: 1,
                    data: data,
					message: '删除成功'
				})
            } catch(err){
                res.send({
					code: 0,
					message: err.message
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
					code: 0,
					message: '表单信息错误'
				})
				return
            }

            try{
                let data = await TagModel.find()
                res.send({
                    code: 0,
                    data: data,
					message: '获取列表成功'
				})
            } catch(err){
                res.send({
					code: 0,
					message: err.message
				})
				return
            }
        })
	}
}

export default new Tag()