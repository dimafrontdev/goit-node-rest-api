import Contact from '../db/models/Contact.js';

export const listContacts = () => Contact.findAll();

export const getContactById = id => Contact.findByPk(id);

export const addContact = data => {
    return Contact.create(data);
}

export const removeContact = async (id) => {
    const contact = await getContactById(id);
    if (!contact) return null;
    await contact.destroy();
    return contact;
}

export const updateContact = async (id, data) => {
    const contact = await getContactById(id);
    if (!contact) return null;

    return contact.update(data, {
        returning: true,
    });
};

export const updateFavorite = async (id, { favorite }) => {
    const contact = await getContactById(id);
    if (!contact) return null;

    return contact.update({ favorite }, { returning: true });
};

const contactsServices = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateFavorite
};

export default contactsServices;