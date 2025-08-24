
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { getRequestBodyMorgan } = require('./utils')
const Person = require('./models/person')
const { errorHandler } = require('./middlewares')
const app = express()

app.use(cors())
app.use(express.json())

morgan.token('requestBody', getRequestBodyMorgan)
app.use(morgan(':method :url :status :response-time :requestBody'))

app.use(express.static('dist'))

const PORT = 3002


app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('At home page')
})

app.get('/api/persons', (req, res) => {
    // 3.13
    Person.find({})
        .then((persons) => {
            res.json(persons)
        })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then((person) => {
            res.json(person)
        })
        .catch(() => {
            res.status(404).end()
        })
})

app.get('/info', (req, res) => {
    Person.find({})
        .then((persons) => {
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
})

app.post('/api/persons', (req, res, next) => {
    if(!req.body.name) {
        res.status(400).json({
            error: 'Name is required.'
        })
        return
    }
    if(!req.body.number) {
        res.status(400).json({
            error: 'Number is required.'
        })
        return
    }
    const newPerson = new Person(req.body)
    newPerson.save() // 3.14
        .then(() => {
            res.status(201).json(newPerson)
        })
        .catch((error) => {
            next(error)
        })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch((error) => {
            next(error)
        })
})

app.put('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            next(error)
        })
})

app.use(errorHandler)

app.listen(PORT)

console.log(`Server running on port ${PORT}`)

// Deployed here: https://fso-open-part3-backend.onrender.com/