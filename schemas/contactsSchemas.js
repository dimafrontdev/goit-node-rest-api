import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        "any.required": "Missing required name field",
        "string.empty": "Name cannot be empty",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Missing required email field",
        "string.email": "Email must be a valid email",
        "string.empty": "Email cannot be empty",
    }),
    phone: Joi.string().trim().required().messages({
        "any.required": "Missing required phone field",
        "string.empty": "Phone cannot be empty",
    }),
    favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().trim().messages({
        "string.empty": "Name cannot be empty",
    }),
    email: Joi.string().email().messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email cannot be empty",
    }),
    phone: Joi.string().trim().messages({
        "string.empty": "Phone cannot be empty",
    }),
    favorite: Joi.boolean(),
}).min(1).messages({
    "object.min": "Body must have at least one field",
});

export const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});