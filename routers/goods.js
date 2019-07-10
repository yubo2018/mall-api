    
import express from 'express';
import Goods from '../controller/GoodsController';
import Group from '../controller/GoodsGroupController';
const router = express.Router();

router.post('/save', Goods.save )
router.post('/list', Goods.list )

router.post('/cats/save', Goods.catsSave )
router.get('/cats/list', Goods.catsList )

router.post('/group/save', Group.save )
router.post('/group/list', Group.list )
export default router