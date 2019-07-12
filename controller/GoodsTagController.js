'use strict';

import TagModel from '../models/goods_tag'
import baseComponent from '../prototype/baseComponent'
import formidable from 'formidable'

class Tag extends baseComponent {
	constructor() {
		super()
		this.addTag = this.addTag.bind(this)
	}
	async addTag(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const { tagName } = fields;
			try {
				if (!tagName) {
					throw new Error('标签名称不能为空')
				}
			} catch (err) {
				console.log('前台参数出错', err.message);
				res.send({
					status: 0,
					type: 'ERROR_PARAMS',
					message: err.message
				})
				return
			}

			try {
				const exists = await TagModel.findOne({ tagName })
				if (exists) {
					res.send({
						status: 0,
						type: 'RESTURANT_EXISTS',
						message: '标签名称已经存在',
					})
					return
				}
				const newTagId = await this.getId('tagId');
				await TagModel.create({
					tagName: tagName,
					tagId: newTagId
				})
				res.send({
					status: 1,
					type: 'SUCCESS_DATA',
					message: '标签添加成功',
				})
			} catch (err) {
				res.send({
					status: 0,
					type: 'ERROR_ADD_TAG',
					message: err.message,
				})
				return
			}
		})
	}
	async delTag(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const tagId = JSON.parse(fields.tagId)
			try {
				if (!(tagId instanceof Array)) {
					throw new Error('标签ID错误')
				} else if (!tagId.length) {
					throw new Error('标签ID不能为空')
				}
			} catch (err) {
				console.log('前台参数出错', err.message);
				res.send({
					status: 0,
					type: 'ERROR_PARAMS',
					message: err.message
				})
				return
			}

			try {
				let delOne = await TagModel.deleteMany({ tagId: { $in: tagId } })
				// let delOne = await TagModel.updateMany({
				// 			$or: [{tagId: {$exists: false}}, {tagId: { $in: tagId }}],
				// 			},{$set: {dataFlag: 0}})
				if (!delOne.n) {
					throw new Error('删除失败，无效ID')
				}
				res.send({
					status: 1,
					type: 'SUCCESS_DELETE',
					message: `删除成功,共删除${delOne.deletedCount}条数据`
				})
				return
			} catch (err) {
				res.send({
					status: 0,
					type: 'ERROR_DELETE',
					message: err.message
				})
				return
			}
		})
	}
	async getList(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			try {
				const keyword = fields.tagName //从URL中传来的 keyword参数
				const reg = new RegExp(keyword, 'i') //不区分大小写
				let filter = {
					$or: [ //多条件，数组
						{
							tagName: { $regex: reg },
							dataFlag: 1
						}
					]
				}
				let data = await TagModel.find(filter, { _id: 0, updatedTime: 0, createTime: 0 })
				res.send({
					status: 1,
					data: data,
					type: 'ERROR_TO_GET_TAG',
					message: '获取列表成功'
				})
			} catch (err) {
				console.log('获取标签失败', err);
				res.send({
					status: 0,
					type: 'ERROR_TO_GET_TAG',
					message: '获取标签失败'
				})
				return
			}
		})
	}
	async updateTag(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const { tagName, tagId } = fields;
			try {
				if (!tagName) {
					throw new Error('标签名称不能为空')
				} else if (!tagId || (typeof Number(tagId)) != 'number') {
					throw new Error('标签ID错误')
				}
			} catch (err) {
				console.log('前台参数出错', err.message);
				res.send({
					status: 0,
					type: 'ERROR_PARAMS',
					message: err.message
				})
				return
			}

			try {
				const exists = await TagModel.findOne({ tagName })
				if (exists && exists.tagId != tagId) {
					res.send({
						status: 0,
						type: 'RESTURANT_EXISTS',
						message: '标签名称已经存在',
					})
					return
				}
				let updOne = await TagModel.findOneAndUpdate({ tagId }, { $set: { tagName } }, { new: true });
				if (!updOne) {
					throw new Error('修改失败，请检查标签ID是否正确')
				}
				res.send({
					status: 1,
					type: 'SUCCESS_UPDATE_RESTAURANT',
					success: '修改标签信息成功'
				})
				return
			} catch (err) {
				console.log(err.message, err);
				res.send({
					status: 0,
					type: 'ERROR_UPDATE_RESTAURANT',
					message: '更新标签信息失败',
				})
			}
		})
	}
}

export default new Tag()