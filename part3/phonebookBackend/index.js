const express = require('express')
const app = express()

const morgan = require('morgan')

require('dotenv').config()
const cors = require('cors')

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

const Contact = require('./models/contact')


app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Contact.findById(request.params.id)
        .then(contact => {
            if (contact) {
                response.json(contact)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing' })
    }

    const contact = new Contact({
        name: body.name,
        number: body.number,
    })

    contact.save()
        .then(savedContact => {
            response.json(savedContact)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { content, important } = request.body

    const contact = {
        name: body.name,
        number: body.number,
    }

    Contact.findByIdAndUpdate(request.params.id, { name, number },
        { new: true, runValidators: true, context: 'query' })
        .then(updatedContact => {
            response.json(updatedContact)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

