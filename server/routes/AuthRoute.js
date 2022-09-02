import express from 'express';
import { loginUser, registerUser } from '../controllers/AuthController.js';

const router = express.Router()


router.post('/register', authMiddleware,registerUser)
router.post('/login', authMiddleware, loginUser)

export default router