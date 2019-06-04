    
import express from 'express';
import Member from '../controller/MemberController';
const router = express.Router();


router.post('/login', Member.login )
router.post('/register', Member.register )

export default router