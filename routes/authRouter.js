import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { loginSchema, registerSchema } from '../schemas/authSchemas.js';
import {
  getProfile,
  login,
  logout,
  register,
} from '../controllers/authController.js';
import auth from '../helpers/auth.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

router.post('/login', validateBody(loginSchema), login);

router.post('/logout', auth, logout);

router.get('/current', auth, getProfile);

export default router;
