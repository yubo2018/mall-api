'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const goodsSchema = new Schema({
    // 基本信息
    goodsId: Number,// 自增ID
    goodsName: { type: String, default: '' },   // 商品名称  
    goodsCatId: { type: Number, default: '' },  // 商品类目ID   
    goodsType: { type: Number, default: 1 },    // 商品类型 （1 实物商品 2 虚拟物品）
    goodsTag: { type: Number, default: '' },    // 商品标签ID 
    goodsImg: { type: String, default: '' },    // 商品图片   
    gallery: { type: Array, default: [] },     //  商品相册                                               
    goodsVideo: { type: String, default: '' },    // 商品视频   
    goodsAttribute: { type: Array, default: '' },    // 商品属性
    goodsServer: { type: String, default: '' },    // 商品服务

    // 配送/价格设置
    delivery: { type: Number, default: 0 },     // 配送方式 （1 商家配送 2 自提）
    Freight: { type: Number, default: 0 },     // 运费模板ID
    isSpec: { type: Number, default: 0 },      // 是否有规格  0:没有 1:有                                 
    goodsSpec: { type: Array, default: [] },     //  商品规格
    goodsSn: { type: String, default: '' },     // 商品编号   
    productNo: { type: String, default: '' },   // 商品货号  
    shopPrice: { type: Number, default: 0 },   // 销售价                                                 
    costPrice: { type: Number, default: 0 }, // 成本价
    marketPrice: { type: Number, default: 0 }, // 市场价 
    goodsStock: { type: Number, default: 0 },  // 商品总库存                                              
    warnStock: { type: Number, default: 0 },   // 预警库存    
    goodsUnit: { type: String, default: '件' },   // 单位  
    goodsWeight: { type: String, default: '件' },   // 重量（Kg）
    goodsVolume: { type: String, default: '件' },   // 体积（m³）
    
    goodsTips: { type: String, default: '' },   // 促销信息                                                
    isSale: { type: Number, default: 0 },      // 是否上架  0:不上架 1:上架                               
    isBest: { type: Number, default: 0 },      // 是否精品  0:否 1:是
    isHot: { type: Number, default: 0 },       // 是否热销产品  0:否 1:是                                 
    isNews: { type: Number, default: 0 },       // 是否新品  0:否 1:是                                     
    isRecom: { type: Number, default: 0 },     // 是否推荐  0:否 1:是                                     
    brandId: { type: Number, default: '' },     //  品牌Id                                                 
    goodsDesc: { type: String, default: '' },   // 商品描述                                                
    goodsStatus: { type: Number, default: 0 }, // 商品状态  -1:违规 0:未审核 1:已审核                   
    saleNum: { type: Number, default: '' },     //  总销售量                                               
    saleTime: { type: String, default: '' },    //   上架时间                                              
    visitNum: { type: Number, default: '' },    //   访问数i                                               
    appraiseNum: { type: Number, default: '' }, // 评价数                                                  
    goodsSeoKeywords: { type: String, default: '' }, // 商品SEO关键字                                      
    illegalRemarks: { type: String, default: '' }, // 状态说明  一般用于说明拒绝原因                       
    dataFlag: { type: Number, default: 1 },    // 删除标志  -1:删除 1:有效                                
    createTime: { type: String, default: '' },   // 创建时间                                               
})

goodsSchema.index({ id: 1 });

const Goods = mongoose.model('ff__goods', goodsSchema);


export default Goods
