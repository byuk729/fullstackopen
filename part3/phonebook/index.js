const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
morgan.token('body', (request, response) => {
    return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :body'))
persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const time = new Date()
    const count = persons.length
    const html = `<div>
        <p>Phonebook has info for ${count} people</p>
        <p>${time}</p>
    </div>`
    response.send(html)
})
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const randId = Math.floor(Math.random() * 10000)
    const newPerson = request.body
    console.log(request.body)
    if (!newPerson.name || !newPerson.number) {
        return response.status(400).json({
            error: 'no name or number'
        })
    }
    nameExists = persons.some(person => person.name === newPerson.name)
    if (nameExists) {
        return response.status(404).json({
            error: 'name already exists'
        })
    }
    newPerson.id = randId
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)