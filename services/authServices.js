import User from '../db/models/User.js';
import HttpError from '../helpers/HttpError.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/jwt.js';
import gravatar from 'gravatar';

export const getUserByEmail = async email =>
  await User.findOne({ where: { email } });
export const getUserById = async userId => await User.findByPk(userId);

const register = async data => {
  const { email, password } = data;
  const user = await getUserByEmail(email);

  if (user) {
    throw HttpError(409, 'Email is already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatar = gravatar.url(email, { s: '150' }, true);
  return User.create({ ...data, password: hashPassword, avatarURL: avatar });
};

export const login = async data => {
  const { email, password } = data;
  const user = await getUserByEmail(email);

  if (!user) {
    throw HttpError(401, 'Email or password is incorrect');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw HttpError(401, 'Email or password is incorrect');
  }

  const token = generateToken({ email });
  const updatedUser = await user.update({ token }, { returning: true });
  return {
    token,
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  };
};

export const logout = async id => {
  const user = await getUserById(id);

  if (!user) {
    throw HttpError(401, 'Not authorized');
  }

  await user.update({ token: null });
};

export const updateUser = async (id, data) => {
  const user = await getUserById(id);

  if (!user) {
    throw HttpError(401, 'User not found');
  }

  return user.update(data, {
    returning: true,
  });
};

const authServices = { register, login, logout, updateUser };
export default authServices;
