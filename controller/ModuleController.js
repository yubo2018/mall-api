'use strict';

import WeappModel from '../models/module'
import baseComponent from '../prototype/baseComponent'
// import weappConfig from '../InitData/weappConfig'
import formidable from 'formidable'
class System extends baseComponent {
	constructor() {
		super()
		this.getList = this.getList.bind(this)
	}
	async getList(req, res, next) {
		try {
			let filter = {};
			let data = await WeappModel.find(filter, { _id: 0, updatedTime: 0, createTime: 0 })
			res.send({
				status: 1,
				data: data,
				type: 'SUCCESS_MODULE',
				message: '获取列表成功'
			})

		} catch (err) {
			console.log('获取组件失败', err);
			res.send({
				status: 0,
				type: 'ERROR_TO_GET_TAG',
				message: '获取组件失败'
			})
			return
		}
	}
	async updateModule(req, res, next) {

	}
}

export default new System()