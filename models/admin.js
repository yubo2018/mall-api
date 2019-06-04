'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const adminSchema = new Schema({
	memberId: Number,
	memberName: String,
	telephone: Number,
	email: String,
	password: String,
	createTime: String,
	ustatus:  Number,  //1:普通管理、 2:超级管理员
	memberAvatar: { type: String, default: 'default.jpg' },
})

adminSchema.index({ id: 1 });

const Admin = mongoose.model('ff__admin', adminSchema);


export default Admin