import Contact from '../db/models/Contact.js';

export const listContacts = ({ owner }) => Contact.findAll({ where: { owner } });

export const getContact = ({id, owner}) => Contact.findOne({ where: { id, owner } })

export const addContact = data => {
    return Contact.create(data);
}

export const removeContact = async ({id, owner}) => {
    const contact = await getContact({id, owner});
    if (!contact) return null;
    await contact.destroy();
    return contact;
}

export const updateContact = async ({ id, owner }, data) => {
    const contact = await getContact({id, owner});
    if (!contact) return null;

    return contact.update(data, {
        returning: true,
    });
};

export const updateFavorite = async ({ id, owner }, { favorite }) => {
    const contact = await getContact({id, owner});
    if (!contact) return null;

    return contact.update({ favorite }, { returning: true });
};

const contactsServices = {
    listContacts,
    getContact,
    removeContact,
    addContact,
    updateContact,
    updateFavorite
};

export default contactsServices;