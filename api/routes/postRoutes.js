import express from "express";
import { createPost, getposts, deletePost, updatePost } from '../controllers/postController.js'
import { verifyToken } from '../utils/userVerify.js'

const router = express.Router()

router.post('/create', verifyToken, createPost)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)
router.put('/updatepost/:postId/:userId', verifyToken, updatePost)


export default router