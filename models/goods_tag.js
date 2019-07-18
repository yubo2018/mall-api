'use strict';

import mongoose from 'mongoose'
import dtime from 'time-formater'

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tagId: Number, //自增ID 
    tagName: { type: String, default: '' }, //  标签名称
    bindingNum: { type: Number, default: 0 }, //  标签绑定商品数
    dataFlag: { type: Number, default: 1 }, //   删除标志  1:有效 -1：删除 
    updatedTime: { type: Date, default:'' }, // 修改时间
    createTime: { type: Date, default: dtime(new Date()).format('YYYY-MM-DD HH:mm') }, // 建立时间 
}, {
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updatedTime'
    }
}, {
    versionKey: false
})

tagSchema.index({ id: 1 });

const Tag = mongoose.model('ff__goods_tag', tagSchema);


export default Tag
