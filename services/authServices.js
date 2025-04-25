import User from '../db/models/User.js';
import HttpError from '../helpers/HttpError.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../helpers/jwt.js';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';
import { sendVerificationEmail } from './emailService.js';

export const getUserByEmail = async email =>
  await User.findOne({ where: { email } });
export const getUserByQuery = async query =>
  await User.findOne({ where: query });
export const getUserById = async userId => await User.findByPk(userId);

const register = async data => {
  const { email, password } = data;
  const user = await getUserByEmail(email);

  if (user) {
    throw HttpError(409, 'Email is already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatar = gravatar.url(email, { s: '150' }, true);
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...data,
    password: hashPassword,
    avatarURL: avatar,
    verificationToken,
  });

  await sendVerificationEmail(email, verificationToken);
  return newUser;
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

  if (!user.verify) {
    throw HttpError(401, 'Email is not verified');
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

export const verifyUser = async verificationToken => {
  const user = await getUserByQuery({ verificationToken });

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  user.update({
    verificationToken: null,
    verify: true,
  });
};

export const sendVerification = async email => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw HttpError(404, 'User not found');
  }

  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  await sendVerificationEmail(email, user.verificationToken);
};

const authServices = {
  register,
  login,
  logout,
  updateUser,
  verifyUser,
  sendVerification,
};
export default authServices;
