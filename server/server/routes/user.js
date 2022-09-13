import express from 'express'

import { createNewAcc, updateAccInfo} from '../controllers/falseAuth.js';
import { signin, signup } from '../controllers/user.js';

const router=express.Router()

//创建新账户
router.post('/createNewAcc',createNewAcc)

//修改账户信息
router.patch('/:id',updateAccInfo)

router.post('/signin',signin)
router.post('/signup',signup)

export default router;