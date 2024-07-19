import { useState, useEffect } from 'react'
import axios from 'axios'
import contactService from './services/contacts'

import FilterName from './components/FilterName'
import AddContact from './components/AddContact'
import DataFilter from './components/DataFilter'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const hookEffect = () => {
    contactService.getAllContacts()
      .then(response => {
        console.log('promesa completada');
        setPersons(response.data)
      })
  }

  useEffect(hookEffect, [])

  const handleFilter = (event) => {
    const filter = event.target.value.toLowerCase();
    setSearchTerm(filter);
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    const checkedName = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());
    console.log(checkedName);
    if (!checkedName) {
      const contactObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      contactService.createContact(contactObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        }
        )
    } else {
      alert(`El nombre ${newName} ya existe.`)
      setNewName('')
      setNewNumber('')
    }
  }


  // console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterName handleFilter={handleFilter} />
      <AddContact addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <DataFilter persons={persons} searchTerm={searchTerm} setPersons={setPersons} />
    </div>
  )
}

export default App