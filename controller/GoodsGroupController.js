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
			const { parentId, groupName, groupImg, isRecom } = fields;
			try {
				if (!groupName) {
					throw new Error('请输入分组名称')
				} else if (parentId && !groupImg) {
					throw new Error('分组图片不能为空')
				}
			} catch (err) {
				res.send({ 
					status: false, 
					message: err.message
				})
				return
			}
			try {
				const check = await GoodsGroupModel.findOne({ groupName });
				if (check) {
					return res.send({ status: false, message: '分组名称已经存在' })
				}
				let checkGroupId = {};
				if (parentId) {
					checkGroupId = await GoodsGroupModel.findOne({ groupId: parentId })
					if (!checkGroupId) {
						return res.send({ 
							status: false,
							message: '分组ID错误'
						})
					}
				}
				const newGroupId = await this.getId('groupId');
				await GoodsGroupModel.create({
					groupId: newGroupId,
					parentId: checkGroupId.groupId,
					groupName,
					groupImg,
					isRecom
				})
				res.send({ 
					status: true,
					message: '分组添加成功'
				})
				return 
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
				let filter ={}
				let data = await GoodsGroupModel.find(filter, '-_id').sort({sort: -1});

				let group = data.filter(item => !item.parentId)
				let subGroup = data.filter(item => item.parentId)
				let newArr = []
				subGroup.forEach(item =>{
					data.find(item =>  item.parentId);
				})
	
				res.send({
					status: false,
					data: subGroup,
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

export default new Goods()