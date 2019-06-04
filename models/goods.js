'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const goodsSchema = new Schema({
    goodsId: Number,// 自增ID
    goodsSn: { type: String, default: '' },     // 商品编号   
    productNo: { type: String, default: '' },   // 商品货号  
    goodsName: { type: String, default: '' },   // 商品名称  
    goodsImg: { type: String, default: '' },    // 商品图片   
    shopId: { type: Number, default: '' },      // 门店ID  
    marketPrice: { type: Number, default: 0 }, // 市场价  
    shopPrice: { type: Number, default: 0 },   // 门店价                                                  
    warnStock: { type: Number, default: 0 },   // 预警库存                                                
    goodsStock: { type: Number, default: 0 },  // 商品总库存                                              
    goodsUnit: { type: String, default: '件' },   // 单位                                                    
    goodsTips: { type: String, default: '' },   // 促销信息                                                
    isSale: { type: Number, default: 0 },      // 是否上架  0:不上架 1:上架                               
    isBest: { type: Number, default: 0 },      // 是否精品  0:否 1:是                                     
    isHot: { type: Number, default: 0 },       // 是否热销产品  0:否 1:是                                 
    isNews: { type: Number, default: 0 },       // 是否新品  0:否 1:是                                     
    isRecom: { type: Number, default: 0 },     // 是否推荐  0:否 1:是                                     
    goodsCatIdPath: { type: String, default: '' }, // 商品分类ID路径  catId1_catId2_catId3                 
    goodsCatId: { type: Number, default: '' },  // 最后一级商品分类ID                                      
    shopCatId1: { type: Number, default: '' },  // 门店商品分类第一级ID                                    
    shopCatId2: { type: Number, default: '' },  // 门店商品第二级分类ID                                    
    brandId: { type: Number, default: '' },     //  品牌Id                                                 
    goodsDesc: { type: String, default: '' },   // 商品描述                                                
    goodsStatus: { type: Number, default: 0 }, // 商品状态  -1:违规 0:未审核 1:已审核                   
    saleNum: { type: Number, default: '' },     //  总销售量                                               
    saleTime: { type: String, default: '' },    //   上架时间                                              
    visitNum: { type: Number, default: '' },    //   访问数i                                               
    appraiseNum: { type: Number, default: '' }, // 评价数                                                  
    isSpec: { type: Number, default: 0 },      // 是否有规格  0:没有 1:有                                 
    gallery: { type: Array, default: [] },     //  商品相册                                               
    goodsSeoKeywords: { type: String, default: '' }, // 商品SEO关键字                                      
    illegalRemarks: { type: String, default: '' }, // 状态说明  一般用于说明拒绝原因                       
    dataFlag: { type: Number, default: 1 },    // 删除标志  -1:删除 1:有效                                
    createTime: { type: String, default: '' },   // 创建时间                                               
})

goodsSchema.index({ id: 1 });

const Goods = mongoose.model('ff__goods', goodsSchema);


export default Goods
