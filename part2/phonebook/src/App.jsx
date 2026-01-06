import { useState } from 'react'
import Persons from "./components/Persons.jsx"
import PersonForm from "./components/PersonForm.jsx"
import SearchFilter from "./components/SearchFilter.jsx"
const App = () => {
  const [persons, setPersons] = useState([
    { 
      id: 1, 
      name: 'Arto Hellas',
      number: '758-555-0987'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setSearchValue(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      id: persons.length + 1,
      name: newName, 
      number: newNumber
    }
    const nameExists = persons.some(person => newName === person.name)
    if (nameExists) {
      alert(`${newName} already exists in the phonebook`)
    }
    else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const filteredNames = persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter searchInput = {searchValue} handleSearch={handleFilter}/>
      <h2>Add a New</h2>
      <PersonForm nameInput={newName} nameInputAction={handleNameChange} numberInput={newNumber} numberInputAction={handleNumberChange} submitAction={addNumber}/>
      <h2>Numbers</h2>
      <Persons personMap = {filteredNames}/>
    </div>
  )
}

export default App