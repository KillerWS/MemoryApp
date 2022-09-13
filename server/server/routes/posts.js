import express from 'express';
import { getPosts,createPost, updatePost,deletePost,likePost} from '../controllers/posts.js';

import { createNewAcc } from '../controllers/falseAuth.js';

//注意在此处应用了中间件去做验证！！！
import auth from '../middleware/auth.js'
const router=express.Router();

//获取帖子信息
router.get('/',getPosts)

//创建新的帖子
router.post('/',createPost)
//router.post('/',auth,createPost)

//router.patch() is used for updating existing documents
router.patch('/:id',auth,updatePost)

//router.delete('/:id',auth,deletePost)
router.delete('/:id',deletePost)

router.patch('/:id/likePost',auth,likePost)

export default router