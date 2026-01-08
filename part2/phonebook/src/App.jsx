import { useState, useEffect} from 'react'
import Persons from "./components/Persons.jsx"
import PersonForm from "./components/PersonForm.jsx"
import SearchFilter from "./components/SearchFilter.jsx"
import personService from './services/people'
import Notification from './components/Notification.jsx'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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
      name: newName, 
      number: newNumber
    }
    const existingPerson = persons.find(person => newName.toLowerCase() === person.name.toLowerCase())
    if (existingPerson) {
      if (window.confirm(`${newName} already exists in the phonebook, replace the old number with a new one?`)) {
        personService.updatePerson(existingPerson.id, nameObject).then(updatedPerson => {
           setPersons(persons.map(person => 
            person.id === existingPerson.id ? updatedPerson : person
           ))
           setErrorMessage(`${existingPerson.name} has been updated`)
           setTimeout(() => {
              setErrorMessage(null)
           }, 5000)
        }
        ).catch(error => {
          setErrorMessage(`Information of ${existingPerson.name} has already been deleted from the server`)
          setPersons(persons.filter(person => person.id !== existingPerson.id))
          setTimeout(() => {
              setErrorMessage(null)
           }, 5000)
        }).finally(() => {
          setNewName('')
          setNewNumber('')
        }
        )
      }
    }
    else {
      personService.create(nameObject)
      .then(
        newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`${nameObject.name} has been created`)
          setTimeout(() => {
              setErrorMessage(null)
           }, 5000)
      })
    }
  }

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this person"))
    {
      personService.deletePerson(id).then(() => {
      const arrayAfterDelete = persons.filter(person => person.id !== id)
      setPersons(arrayAfterDelete)
    })
    }
  }

  useEffect(() => {
    personService.getAll('http://localhost:3001/persons')
    .then(initialPeople => setPersons(initialPeople))
  }, [])

  const filteredNames = persons.filter(person => person.name.toLowerCase().includes(searchValue.toLowerCase()))
  return (
    <div>
      <Notification message={errorMessage}/>
      <h2>Phonebook</h2>
      <SearchFilter searchInput = {searchValue} handleSearch={handleFilter}/>
      <h2>Add a New</h2>
      <PersonForm nameInput={newName} nameInputAction={handleNameChange} numberInput={newNumber} numberInputAction={handleNumberChange} submitAction={addNumber}/>
      <h2>Numbers</h2>
      <Persons personMap = {filteredNames} handleDelete={handleDelete}/>
    </div>
  )
}

export default App