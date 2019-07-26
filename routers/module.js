    
import express from 'express';
import Module from '../controller/ModuleController';
const router = express.Router();

router.get('/list', Module.getList )

export default router