import React from 'react'

function AddContact({ addContact, newName, handleNameChange, newNumber, handleNumberChange }) {
    return (
        <>
            <h2>Add a new</h2>
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