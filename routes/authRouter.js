import express from 'express';
import validateBody from '../helpers/validateBody.js';
import {
  loginSchema,
  registerSchema,
  verifySchema,
} from '../schemas/authSchemas.js';
import {
  getProfile,
  login,
  logout,
  register,
  sendVerification,
  updateAvatar,
  verifyUser,
} from '../controllers/authController.js';
import auth from '../helpers/auth.js';
import upload from '../helpers/upload.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

router.post('/login', validateBody(loginSchema), login);

router.post('/logout', auth, logout);

router.get('/current', auth, getProfile);

router.patch('/avatars', auth, upload.single('avatar'), updateAvatar);

router.get('/verify/:verificationToken', verifyUser);

router.post('/verify', validateBody(verifySchema), sendVerification);

export default router;
