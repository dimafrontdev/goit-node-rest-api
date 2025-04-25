import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Missing required email field',
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Missing required password field',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 6 characters long',
  }),
  subscription: Joi.string().valid('starter', 'pro', 'business').messages({
    'any.only':
      'Subscription must be one of the following: starter, pro, business',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Missing required email field',
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Missing required password field',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 6 characters long',
  }),
});

export const verifySchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Missing required email field',
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email cannot be empty',
  }),
});
