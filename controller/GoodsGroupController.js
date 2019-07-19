'use strict';

import GoodsGroupModel from '../models/goods_group'
import baseComponent from '../prototype/baseComponent'
import formidable from 'formidable'


class Goods extends baseComponent {
	constructor() {
		super()
		this.addGroup = this.addGroup.bind(this)
	}
	async addGroup(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const { parentId, groupName, groupImg, isRecom } = fields;
			try {
				if (!groupName) {
					throw new Error('请输入分组名称')
				} else if (parentId && !groupImg) {
					throw new Error('分组图片不能为空')
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
				const exists = await GoodsGroupModel.findOne({ groupName });
				if (exists) {
					res.send({
						status: false,
						type: 'ERROR_GROUP_NAME',
						message: '分组名称已经存在'
					})
					return
				}
				let checkGroupId = {};
				if (parentId) {
					checkGroupId = await GoodsGroupModel.findOne({ groupId: parentId })
					if (!checkGroupId) {
						res.send({
							status: false,
							type: 'ERROR_GROUPID',
							message: '分组ID错误'
						})
						return
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
	async delGroup(req, res, next) {

	}
	async getList(req, res, next) {
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
				let filter = {}
				let data = await GoodsGroupModel.find(filter, '-_id').sort({ sort: -1 });

				let group = data.filter(item => !item.parentId)
				let subGroup = data.filter(item => item.parentId)
				let newArr = []
				subGroup.forEach(item => {
					data.find(item => item.parentId);
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
	async updateGroup(req, res, next) {

	}
}

export default new Goods()