    
import express from 'express';
import Goods from '../controller/GoodsController';
import Group from '../controller/GoodsGroupController';
import GoodsTag from '../controller/GoodsTagController';
const router = express.Router();

router.post('/save', Goods.save )
router.post('/list', Goods.list )

router.post('/cats/save', Goods.catsSave )
router.get('/cats/list', Goods.catsList )

router.post('/add', Group.addGroup )



router.post('/tag/add', GoodsTag.addTag)
router.post('/tag/del', GoodsTag.delTag)
router.get('/tag/list', GoodsTag.getList)
router.post('/tag/update', GoodsTag.updateTag)

export default router