    
import express from 'express';
import Tag from '../controller/GoodsTagController';
const router = express.Router();

router.post('/save', Tag.save )
router.post('/list', Tag.list )
router.post('/del', Tag.del )
export default router