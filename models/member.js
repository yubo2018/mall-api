'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const memberSchema = new Schema({
	memberId: Number,
	memberName: String,
	telephone: Number,
	email: String,
	password: String,
	createTime: String,
	ustatus:  Number,  //1:普通管理、 2:超级管理员
	memberAvatar: { type: String, default: 'default.jpg' },
})

memberSchema.index({ id: 1 });

const member = mongoose.model('ff__member', memberSchema);


export default member


