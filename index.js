let { persons } = require('./data')

const express = require('express')
const morgan = require('morgan')
const { getRandomInteger, getRequestBodyMorgan } = require('./utils')
const app = express()

app.use(express.json())

morgan.token('requestBody', getRequestBodyMorgan)
app.use(morgan(':method :url :status :response-time :requestBody'))

const PORT = 3001


app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('At home page')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => { 
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const date = new Date()
    const response = `
        <div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${date}</p>
        </div>
    `
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(response)
})

app.post('/api/persons', (req, res) => {
    const newPerson = req.body

    if(!newPerson.name) {
        res.status(400).json({
            error: "Name is required."
        })
        return
    }
    if(!newPerson.number) {
        res.status(400).json({
            error: "Number is required."
        })
        return
    }

    const hasDuplicate = persons.find((person) => {
        return person.name.toLowerCase() === newPerson.name.toLowerCase()
    })

    if(hasDuplicate) {
        res.status(400).json({
            error: "Name must be unique"
        })
        return
    }

    newPerson.id = getRandomInteger()
    persons = persons.concat(newPerson)
    res.status(201).json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
    const deleteId = req.params.id
    persons = persons.filter(person => person.id !== deleteId)
    res.status(204).end()
})

app.listen(PORT)

console.log(`Server running on port ${PORT}`)