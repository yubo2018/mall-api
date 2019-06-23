'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupId: Number, //自增ID 
    parentId: { type: Number, default: 0 }, //   父ID 
    groupName: { type: String, default: '' }, //  分类名称 
    isShow: { type: Number, default: '' }, // 是否显示  0:隐藏 1:显示 
    sort: { type: Number, default: '' }, //  排序号 
    dataFlag: { type: Number, default: '' }, //   删除标志  1:有效 -1：删除 
    createTime: { type: String, default: '' }, // 建立时间 
})

groupSchema.index({ id: 1 });

const Group = mongoose.model('ff__goods_group', groupSchema);


export default Group

