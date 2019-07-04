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
					status: false,
					message: '表单信息错误'
				})
				return
			}

			const { tagName, tagId } = fields;
			try {
				if (!tagName) {
					throw new Error('标签名称不能为空')
				}
				if (tagId && (typeof Number(tagId)) != 'number') {
					throw new Error('ID类型错误')
				}
			} catch (err) {
				res.send({
					status: false,
					message: err.message,
				})
				return
			}

			try {
				const check = await TagModel.findOne({ tagName })
				if (check) {
					res.send({
						status: false,
						message: '标签名称已经存在',
					})
					return false
				}
			} catch (err) {
				res.send({
					status: false,
					message: err.message,
				})
				return false
			}

			try {
				if (tagId) {
					let updOne =  await TagModel.findOneAndUpdate({
						tagId
					}, { 
						tagName
					},{ new: true })
					if(!updOne){
						throw new Error('修改失败，请检查标签ID是否正确')
					}
					res.send({
						status: true,
						message: '标签修改成功',
					})
					return
				}
			} catch (err) {
				res.send({
					status: false,
					message: err.message,
				})
				return
			}

			try {
				const newTagId = await this.getId('tagId');
				await TagModel.create({
					tagName: tagName,
					tagId: newTagId
				})
				res.send({
					status: true,
					message: '标签添加成功',
				})
			} catch (err) {
				res.send({
					status: false,
					message: err.message,
				})
				return
			}
		})
	}

	async del(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					status: false,
					message: '表单信息错误'
				})
				return
			}

			const { tagId } = fields;
			try {
				if (!(tagId instanceof Array)) {
					throw new Error('标签ID错误')
				}
				if (!tagId.length) {
					throw new Error('标签ID不能为空')
				}
			} catch (err) {
				res.send({
					status: false,
					message: err.message,
				})
				return
			}

			try {
				let delOne = await TagModel.remove({ tagId: { $in: tagId } })
				if(!delOne.n){
					throw new Error('删除失败，无效ID')
				}
				res.send({
					status: true,
					message: `删除成功,共删除${delOne.deletedCount}条数据`
				})
			} catch (err) {
				res.send({
					status: false,
					message: err.message
				})
				return
			}
		})
	}
	async list(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					status: false,
					message: '表单信息错误'
				})
				return
			}

			try {
				const keyword = fields.tagName //从URL中传来的 keyword参数
				const reg = new RegExp(keyword, 'i') //不区分大小写
				let data = await TagModel.find({
					$or: [ //多条件，数组
						{ tagName: { $regex: reg } }
					]
				},
					{
						// password : 0 // 返回结果不包含密码字段
					},
					{
						sort: { _id: -1 },// 按照 _id倒序排列
						limit: 100 // 查询100条
					})
				res.send({
					status: true,
					data: data,
					message: '获取列表成功'
				})
			} catch (err) {
				res.send({
					status: false,
					message: err.message
				})
				return
			}
		})
	}
}

export default new Tag()