'use strict';

import SystemModel from '../models/system'
import baseComponent from '../prototype/baseComponent'
import formidable from 'formidable'
class System extends baseComponent {
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
            const { mall_title } = fields;
			try {
				if (!mall_title) {
					throw new Error('商城名称错误')
				}
			} catch (err) {
				res.send({
					code: 0,
					message: err.message,
				})
				return
            }
            
			try {
				const check = await SystemModel.findOne({ mall_title })
				if (check) {
					res.send({
						code: 0,
						message: '商城名称已经存在',
					})
				} else {
                    const mall_id = await this.getId('mall_id');
                    fields['mall_id'] = mall_id;
					const newSystemInfo = fields
					await SystemModel.create(newSystemInfo)
					res.send({
						code: 1,
						message: '修改成功',
					})
				}
			} catch (err) {
				res.send({
					code: 0,
					message: err.message,
				})
				return
			}
        })
	}
}

export default new System()