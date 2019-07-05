'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupId: Number, //自增ID 
    parentId: { type: Number, default: null }, //   父ID
    groupName: { type: String, default: '' }, //  分组名称 
    groupImg: { type: String, default: '' }, //  分组图片 
    sort: { type: Number, default: 0 }, //  排序号 
    isShow: { type: Number, default: 1 }, // 是否显示  0:隐藏 1:显示 
    isRecom: { type: Number, default: 1 }, // 是否热门推荐  0:关闭 1:开启 
    createTime: { type: Date, default: Date.now() }, // 建立时间 
}, {
    versionKey: false
})

groupSchema.index({ id: 1 });

const Group = mongoose.model('ff__goods_group', groupSchema);


export default Group

