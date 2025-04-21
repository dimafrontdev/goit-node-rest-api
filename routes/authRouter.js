import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { loginSchema, registerSchema } from '../schemas/authSchemas.js';
import {
  getProfile,
  login,
  logout,
  register,
  updateAvatar,
} from '../controllers/authController.js';
import auth from '../helpers/auth.js';
import upload from '../helpers/upload.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

router.post('/login', validateBody(loginSchema), login);

router.post('/logout', auth, logout);

router.get('/current', auth, getProfile);

router.patch('/avatars', auth, upload.single('avatar'), updateAvatar);

export default router;
