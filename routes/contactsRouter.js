import express from "express";
import {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
  updateFavorite
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from '../schemas/contactsSchemas.js';
import auth from '../helpers/auth.js';

const router = express.Router();

router.use(auth);

router.get("/", getAllContacts);

router.get("/:id", getOneContact);

router.post("/", validateBody(createContactSchema), createContact);

router.delete("/:id", deleteContact);

router.put("/:id", validateBody(updateContactSchema), updateContact);

router.patch('/:id/favorite', validateBody(updateFavoriteSchema), updateFavorite);

export default router;
