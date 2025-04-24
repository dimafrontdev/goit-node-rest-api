import authServices from '../services/authServices.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import HttpError from '../helpers/HttpError.js';

export const register = async (req, res, next) => {
  try {
    const { email, subscription } = await authServices.register(req.body);
    res.status(201).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { token, user } = await authServices.login(req.body);
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  await authServices.logout(req.user.id);
  res.status(204).send();
};

export const getProfile = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

export const updateAvatar = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!req.file) {
      return next(HttpError(400, 'No file uploaded'));
    }

    const { path: tempPath, filename } = req.file;
    const avatarsDir = path.resolve('public', 'avatars');
    const finalPath = path.join(avatarsDir, filename);

    await fs.rename(tempPath, finalPath);

    const avatarURL = `/avatars/${filename}`;
    await authServices.updateUser(id, { avatarURL });
    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
