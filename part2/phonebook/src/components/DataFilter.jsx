import React from 'react'
import DataContact from './DataContact'
import contactService from '../services/contacts'


function DataFilter({ persons, setPersons, searchTerm }) {

    const handleDelete = (id) => {
        contactService.deleteContact(id)
            .then(() => {
                console.log('Contact deleted');
                return contactService.getAllContacts();
            })
            .then(response => {
                setPersons(response.data);
            })
    }

    return (
        <>
            {
                searchTerm !== '' ?
                    persons.filter(person => person.name.toLowerCase().includes(searchTerm)).map(person => <DataContact key={person.id} contact={person} handleDelete={() => handleDelete(person.id)} />)
                    :
                    <>
                        <h2>Numbers</h2>
                        {persons.map(person => <DataContact key={person.id} contact={person} handleDelete={() => handleDelete(person.id)} />)}
                    </>
            }
        </>
    )
}

export default DataFilter