'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    catId: Number, //自增ID 
    parentId: { type: String, default: '' }, //   父ID 
    catName: { type: String, default: '' }, //  分类名称 
    isShow: { type: Number, default: '' }, // 是否显示  0:隐藏 1:显示 
    isFloor: { type: Number, default: '' }, //  是否显示楼层  0:不显示 1:显示 
    catSort: { type: Number, default: '' }, //  排序号 
    dataFlag: { type: Number, default: '' }, //   删除标志  1:有效 -1：删除 
    createTime: { type: String, default: '' }, // 建立时间 
    commissionRate: { type: String, default: '' }, //商品佣金比例  -1代表使用上级父类的佣金设置 
})

categorySchema.index({ id: 1 });

const Category = mongoose.model('ff__goods_cats', categorySchema);


export default Category

