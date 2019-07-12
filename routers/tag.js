
import express from 'express';
import Tag from '../controller/GoodsTagController';
const router = express.Router();

router.post('/add', Tag.addTag)
router.post('/del', Tag.delTag)
router.post('/list', Tag.getList)
router.post('/update', Tag.updateTag)

export default router