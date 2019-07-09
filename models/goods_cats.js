'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    catId: Number, //自增ID 
    groupId: { type: Schema.Types.ObjectId, ref: 'ff__goods_group'}, // 所属分组ID
    catName: { type: String, default: '' }, //  分类名称 
    isShow: { type: Number, default: '' }, // 是否显示  0:隐藏 1:显示 
    catSort: { type: Number, default: '' }, //  排序号 
    dataFlag: { type: Number, default: '' }, //   删除标志  1:有效 -1：删除 
    createTime: { type: Date, default: Date.now() } // 建立时间 
}, {
    versionKey: false
})

categorySchema.index({ id: 1 });

const Category = mongoose.model('ff__goods_cats', categorySchema);


export default Category

