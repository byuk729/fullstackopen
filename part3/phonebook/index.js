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


const Person = require('./models/person.js')

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
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
    Person.findById(id).then(person => {
        response.json(person)
    })
})
app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    body = request.body
    console.log(request.body)

    const person = new Person({
        name: body.name, 
        number: body.number
    })
    person.save().then(newPerson => {
        response.json(newPerson)
    }
    ).catch(error => next(error))
})
app.put('/api/persons/:id', (request, response, next) => {
    id = request.params.id
    console.log(request.body)
    const {name, number} = request.body
    Person.findById(id).then(person => {
         if (!person) {
            return response.status(404).end()
        }
        else {
            person.name = name
            person.number = number
            person.save().then(updatedPerson => {
                response.json(updatedPerson)
            })
        }
    }
    ).catch(error => next(error))
})
const errorHandler = (error, request, response, next) => {
    if (error.name === "CastError") {
        return response.status(400).end()
    }
    if (error.name === "ValidationError") {
        return response.status(400).json({error: error.message})
    }
    next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT || 3001
console.log(`listening on port ${PORT}`)
app.listen(PORT)