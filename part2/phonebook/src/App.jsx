/* eslint-disable react/prop-types */
import { useState, useEffect} from 'react'
import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successfulMessage, setSuccessfulMessage] = useState(null)
  


  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(item => item.number === newNumber)) alert(`the number ${newNumber} is already added to phonebook`)
    else if (persons.find(item => item.name === newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
        const aux_person = persons.find((item) => item.name === newName)
        const personObject = {
          id: aux_person.id,
          name: aux_person.name,
          number: newNumber
        }
        personService
        .update(personObject.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personObject.id ? person : returnedPerson))
          })
        .catch(() => {
          setErrorMessage(
            `Information of '${newName}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    }
    else {
      const maxId = Math.max(...persons.map(person => person.id)) + 1;
      const personObject = {
        id: maxId.toString(),
        name: newName,
        number: newNumber
      }

      setSuccessfulMessage(`Added ${newName}`)
      setTimeout(() => {
        setSuccessfulMessage(null)
      }, 3000)

      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })

      
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
      })
    }
  };

  return (
    <div>
      <Notification message={successfulMessage} type={'successful'}/>
      <Notification message={errorMessage} type={'error'}/>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App