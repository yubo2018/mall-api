'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    groupId: { type: Schema.Types.ObjectId, ref: 'ff__goods_group'}, // 所属分组ID
    catName: { type: String, default: '' }, //  分类名称 
    isShow: { type: Number, default: 1 }, // 是否显示  0:隐藏 1:显示 
    sort: { type: Number, default: 10 }, //  排序号 
    dataFlag: { type: Number, default: 1 }, //   删除标志  1:有效 -1：删除 
    updatedTime: { type: Date, default: Date.now() }, // 修改时间
    createTime: { type: Date, default: Date.now() } // 建立时间 
}, {
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updatedTime'
    }
}, {
    versionKey: false
})

categorySchema.index({ id: 1 });

const Category = mongoose.model('ff__goods_cats', categorySchema);


export default Category

