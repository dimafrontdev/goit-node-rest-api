import contactsServices from '../services/contactsServices.js';


import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await contactsServices.listContacts();
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await contactsServices.getContactById(id);
        if (!contact) {
            return next(HttpError(404));
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await contactsServices.removeContact(id);
        if (!deleted) {
            return next(HttpError(404));
        }
        res.status(200).json(deleted);
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const newContact = await contactsServices.addContact(req.body);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const fieldsToUpdate = req.body;

        if (!Object.keys(fieldsToUpdate).length) {
            return next(HttpError(400, "Body must have at least one field"));
        }

        const updated = await contactsServices.updateContact(id, fieldsToUpdate);
        if (!updated) {
            return next(HttpError(404));
        }

        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

export const updateFavorite = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await contactsServices.updateFavorite(id, req.body);
        if (!data) {
            return  next(HttpError(404));
        }
        res.json(data);
    } catch (error) {
        next(error);
    }
};
