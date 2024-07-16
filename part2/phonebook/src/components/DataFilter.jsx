import React from 'react'
import DataContact from './DataContact'


function DataFilter({ persons, searchTerm }) {
    return (
        <>
            {
                searchTerm !== '' ?
                    persons.filter(person => person.name.toLowerCase().includes(searchTerm)).map(person => <DataContact key={person.id} contact={person} />)
                    :
                    <>
                        <h2>Numbers</h2>
                        {persons.map(person => <DataContact key={person.id} contact={person} />)}
                    </>
            }
        </>
    )
}

export default DataFilter