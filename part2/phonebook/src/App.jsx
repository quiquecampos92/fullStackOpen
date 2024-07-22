import { useState, useEffect } from 'react'
import contactService from './services/contacts'

import FilterName from './components/FilterName'
import AddContact from './components/AddContact'
import DataFilter from './components/DataFilter'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)

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
    const checkedNumber = persons.some(person => person.number === newNumber);
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
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
        )
    } else if (checkedName && !checkedNumber) {
      const personFound = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      const contactObjectUpdated = {
        name: personFound.name,
        number: newNumber,
        id: personFound.id
      }
      contactService.updateContact(personFound.id, contactObjectUpdated)
        .then(() => {
          console.log('Contact updated');
          return contactService.getAllContacts();
        })
        .then(response => {
          setPersons(response.data);
        })
      setNewName('')
      setNewNumber('')
    } else {
      alert(`El nombre ${newName} con número ${newNumber} ya existe.`)
      setNewName('')
      setNewNumber('')
    }
  }


  // console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterName handleFilter={handleFilter} />
      <AddContact message={message} addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <DataFilter persons={persons} searchTerm={searchTerm} setPersons={setPersons} />
    </div>
  )
}

export default App