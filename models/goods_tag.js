'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tagId: Number, //自增ID 
    tagName: { type: String, default: '' }, //  标签名称
    bindingNum: { type: String, default: '' }, //  标签绑定商品数
    dataFlag: { type: Number, default: '' }, //   删除标志  1:有效 -1：删除 
    createTime: { type: String, default: '' }, // 建立时间 
})

tagSchema.index({ id: 1 });

const Tag = mongoose.model('ff__goods_tag', tagSchema);


export default Tag
