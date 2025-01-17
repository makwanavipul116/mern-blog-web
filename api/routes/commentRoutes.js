import express from 'express'
import { createComment, getPostsComments, likeComment, editComment, deleteComment, getcomments } from '../controllers/commentController.js'
import { verifyToken } from '../utils/userVerify.js'

const router = express.Router()

router.post('/create', verifyToken, createComment)
router.get('/getPostComments/:postId', getPostsComments)
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);

export default router