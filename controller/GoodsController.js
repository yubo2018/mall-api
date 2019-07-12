'use strict';

import formidable from 'formidable'
import baseComponent from '../prototype/baseComponent'
import GoodsModel from '../models/goods'
import GoodsCatsModel from '../models/goods_cats'
import GoodsGroupModel from '../models/goods_group'

class Goods extends baseComponent {
	constructor() {
		super()
		this.save = this.save.bind(this)
		this.catsSave = this.catsSave.bind(this)
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
			} catch (err) {
				res.send({
					code: 0,
					message: err.message,
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
					code: 0,
					message: '表单信息错误'
				})
				return
			}

			try {
				let data = await GoodsModel.find()
				res.send({
					code: 0,
					data: data,
					message: '获取列表成功'
				})
			} catch (err) {
				res.send({
					code: 0,
					message: err.message
				})
				return
			}
		})
	}
	async catsSave(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					code: 0,
					message: '表单信息错误'
				})
				return
			}
			const { catId, groupId, catName, isShow, sort } = fields
			try {
				if (!groupId) {
					throw new Error('分组ID不能为空')
				} else if (!catName) {
					throw new Error('分类名称不能为空')
				}
			} catch (err) {
				res.send({
					code: 0,
					message: err.message
				})
				return
			}

			try {
				let checkCatName = await GoodsCatsModel.findOne({ catName });
				if (checkCatName) {
					throw new Error('分类名称已存在')
				}
				let checkGroupId = await GoodsGroupModel.findById(groupId);
				if (!checkGroupId) {
					throw new Error('分组ID错误')
				}
				// 修改
				if (catId) {
					let checkCatId = await GoodsCatsModel.findById(catId);
					if (!checkCatId) {
						throw new Error('分类ID错误')
					}
					let updData = {
						groupId: checkGroupId._id,
						catName: catName ? catName : checkCatId.catName,
						isShow: isShow ? isShow : checkCatId.isShow,
						sort: sort ? sort : checkCatId.sort
					}
					let updOne = await GoodsCatsModel.findByIdAndUpdate(catId, updData, { new: true })
					if (!updOne) {
						throw new Error('修改失败，请检查分类ID是否正确')
					}
					res.send({
						code: 0,
						message: '分类修改成功'
					})
					return
				}
				// 新增
				await GoodsCatsModel.create({
					groupId: groupId,
					catName: catName,
					isShow: isShow,
					sort: sort
				})
				res.send({
					code: 0,
					message: '分类添加成功'
				})
				return
			} catch (err) {
				res.send({
					code: 0,
					message: err.message
				})
				return
			}
		})
	}
	async catsList(req, res, next) {
		let params = req.query || {};
		const reg = new RegExp(params.catName, 'i') //不区分大小写
		let filter = {
			$or: [ //多条件，数组
				{ catName: { $regex: reg } }
			]
		}
		try {
			let data = await GoodsCatsModel.find(filter, '-_id').sort({ sort: -1 }).populate('groupId');
			res.send({
				code: 0,
				data: data,
				message: '数据获取成功'
			})
		} catch (err) {
			res.send({
				code: 0,
				message: err.message
			})
			return
		}
	}
	async groupSave(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					code: 0,
					message: '表单信息错误'
				})
				return
			}
			const { groupId, groupName, isShow, isRecom, sort } = fields;
			try {
				if (!groupName) {
					throw new Error('分组名称不能为空')
				}
			} catch (err) {
				res.send({
					code: 0,
					message: err.message,
				})
				return
			}
			try {
				// 修改
				if (groupId) {
					let checkGroupId = await GoodsGroupModel.findById(groupId);
					if (!checkGroupId) {
						throw new Error('分组ID错误')
					}
					if(groupName == checkGroupId.groupName){
						throw new Error('分组名称已存在')
					}
					let updData = {
						groupName: groupName ? groupName : checkGroupId.groupName,
						isShow: isShow ? isShow : checkGroupId.isShow,
						isRecom: isRecom ? isRecom : checkGroupId.isRecom,
						sort: sort ? sort : checkGroupId.sort
					}
					let updOne = await GoodsGroupModel.findByIdAndUpdate(groupId, updData, { new: true })
					if (!updOne) {
						throw new Error('修改失败，请检查分组ID是否正确')
					}
					res.send({
						code: 0,
						message: '分组修改成功'
					})
					return
				}

				let checkGroupName = await GoodsGroupModel.findOne({ groupName });
				if (checkGroupName) {
					throw new Error('分组名称已存在')
				}
				// 新增
				await GoodsGroupModel.create({
					groupName: groupName,
					isShow: isShow,
					isRecom: isRecom,
					sort: sort
				})
				res.send({
					code: 0,
					message: '分类添加成功'
				})
				return
			} catch (err) {
				res.send({
					code: 0,
					message: err.message,
				})
				return
			}
		})
	}
	async groupList(req, res, next) {

	}
}

export default new Goods()