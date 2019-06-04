    
import express from 'express';
import Admin from '../controller/AdminController';
const router = express.Router();

router.post('/register', Admin.register )

export default router