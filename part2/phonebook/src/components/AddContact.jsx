import React from 'react'

import SuccessMessage from './SuccessMessage'

function AddContact({ message, addContact, newName, handleNameChange, newNumber, handleNumberChange }) {


    return (
        <>
            <h2>Add a new</h2>
            <SuccessMessage message={message} name={newName} />
            <form onSubmit={addContact}>
                <div>
                    Name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    Number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default AddContact