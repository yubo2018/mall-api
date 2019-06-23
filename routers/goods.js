    
import express from 'express';
import Goods from '../controller/GoodsController';
const router = express.Router();

router.post('/save', Goods.save )
router.post('/list', Goods.list )

export default router