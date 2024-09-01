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

app.get('/api/persons/:id', (request, response) => {
    Contact.findById(request.params.id).then(contact => {
        response.json(contact)
    })
})

app.post('/api/books', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing' })
    }

    const contact = new Contact({
        name: body.name,
        number: body.number,
    })

    contact.save().then(savedContact => {
        response.json(savedContact)
    })
})


// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     contacts = contacts.filter(c => c.id !== id)
// })

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

