'use strict';

import GoodsModel from '../models/goods'
import GoodsCatsModel from '../models/goods_cats'
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
					code: 0,
					message: '表单信息错误'
				})
				return
			}
			const { goodsName, goodsCatId, goodsImg, shopPrice } = fields;
			try {
				if (!goodsName) {
					throw new Error('商品名称不能为空')
				} else if (!goodsCatId) {
					throw new Error('请选择商品分类')
				} else if (!goodsImg) {
					throw new Error('商品图片不能为空')
				}
			} catch (err) {
				res.send({
					code: 0,
					message: err.message,
				})
				return
			}
            try {
                const check = await GoodsModel.findOne({ goodsName })
                if (check) {
					res.send({
						code: 0,
						message: '商品已经存在',
                    })
                    return false
                }
                await GoodsModel.create(fields)
                res.send({
                    code: 1,
                    message: '商品添加成功',
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
                let data = await GoodsModel.find()
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
	async catsSave (req, res, next){
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const data = await GoodsCatsModel.create({
				catName:'ce223',
				parentId: "5d22f5edb7b3502ecc41e1ce"
			})
			res.send({actions:123,data})
		})
	}
	async catsFind(req, res, next){
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const data = await GoodsCatsModel.find({},'-_id').populate('parentId')
			res.send({actions:123,data})
		})
	}
}

export default new Goods()