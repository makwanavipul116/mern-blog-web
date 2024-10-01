import express from 'express'
import { verifyToken } from '../utils/userVerify.js'
import { updateUser, deleteUser, signOutUser, getUsers, getUser } from '../controllers/userController.js'

const router = express.Router()

router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signout', signOutUser)
router.get('/getusers', verifyToken, getUsers)
router.get('/:userId', getUser)


export default router