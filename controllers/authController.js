import authServices from '../services/authServices.js';

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
