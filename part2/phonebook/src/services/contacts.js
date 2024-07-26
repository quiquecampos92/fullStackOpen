import axios from 'axios'

const basedUrl = 'http://localhost:3001/api/persons'

const getAllContacts = () => {
    return axios.get(basedUrl)
}

const createContact = (newContact) => {
    return axios.post(basedUrl, newContact)
}

const updateContact = (id, modifiedContact) => {
    return axios.put(`${basedUrl}/${id}`, modifiedContact)
}

const deleteContact = (id) => {
    console.log('Contacto eliminado');
    return axios.delete(`${basedUrl}/${id}`)
}

export default {
    getAllContacts,
    createContact,
    updateContact,
    deleteContact
}