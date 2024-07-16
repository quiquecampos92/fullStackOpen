import { useState } from 'react'
import Contact from './components/Contact'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '000 000', id: 1 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('');

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

      setPersons(persons.concat(contactObject))
      setNewName('')
      setNewNumber('')
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
      <div>
        <p>Filter person:</p>
        <input type="text" onChange={handleFilter} />
      </div>

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

      {
        searchTerm !== '' ?
          persons.filter(person => person.name.toLowerCase().includes(searchTerm)).map(person => <Contact key={person.id} contact={person} />)
          :
          <>
            <h2>Numbers</h2>
            {persons.map(person => <Contact key={person.id} contact={person} />)}
          </>
      }

    </div>
  )
}

export default App