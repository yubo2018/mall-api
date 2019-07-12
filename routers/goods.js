    
import express from 'express';
import Goods from '../controller/GoodsController';
import Group from '../controller/GoodsGroupController';
const router = express.Router();

router.post('/save', Goods.save )
router.post('/list', Goods.list )

router.post('/cats/save', Goods.catsSave )
router.get('/cats/list', Goods.catsList )

router.post('/add', Group.addGroup )
export default router