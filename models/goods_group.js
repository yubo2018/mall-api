'use strict';

import mongoose from 'mongoose'
import dtime from 'time-formater'

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName: { type: String, default: '' }, //  分组名称 
    isShow: { type: Number, default: 1 }, // 是否显示  0:隐藏 1:显示 
    isRecom: { type: Number, default: 0 }, // 是否热门推荐  0:关闭 1:开启 
    dataFlag: { type: Number, default: 1 }, //   删除标志  1:有效 -1：删除 
    sort: { type: Number, default: 100 }, //  排序号 
    updatedTime: { type: Date, default: '' }, // 修改时间
    createTime: { type: Date, default: dtime().format('YYYY-MM-DD HH:mm') }, // 建立时间 
}, {
    versionKey: false
}, {
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updatedTime'
    }
})

groupSchema.index({ id: 1 });

const Group = mongoose.model('ff__goods_group', groupSchema);


export default Group

