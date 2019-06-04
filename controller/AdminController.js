'use strict';

import AdminModel from '../models/admin'
import baseComponent from '../prototype/baseComponent'
import crypto from 'crypto'
import formidable from 'formidable'
class Admin extends baseComponent {
	constructor() {
		super()
		this.register = this.register.bind(this)
	}
	async register(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					code: 0,
					message: '表单信息错误'
				})
				return
			}
			const { user_name, user_mobile, user_password, user_status = 1 } = fields;
			try {
				if (!user_name) {
					throw new Error('用户名称错误')
				} else if (!user_mobile) {
					throw new Error('手机号错误')
				} else if (!user_password) {
					throw new Error('密码错误')
				}
			} catch (err) {
				res.send({
					code: 0,
					message: err.message,
				})
				return
			}

			try {
				const check = await AdminModel.findOne({ user_mobile })
				if (check) {
					res.send({
						code: 0,
						message: '手机号已经存在',
					})
				} else {
					const user_id = await this.getId('user_id');
					const newpassword = this.encryption(user_password);
					const newAdminInfo = {
						user_id: user_id,
						user_name: user_name,
						user_mobile,
						user_password: newpassword,
						user_create_time: new Date().toLocaleString(),
						user_status: user_status
					}
					await AdminModel.create(newAdminInfo)
					res.send({
						code: 1,
						data: {
							user_mobile: user_mobile,
							user_name: user_name,
							user_status: user_status,
							create_time: newAdminInfo.user_create_time
						},
						message: '注册管理员成功',
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

export default new Admin()