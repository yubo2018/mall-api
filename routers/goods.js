    
import express from 'express';
import Goods from '../controller/GoodsController';
const router = express.Router();

router.post('/save', Goods.save )
router.get('/list', Goods.list )

export default router