const express = require('express')
const app = express()

const contacts = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>PhoneBook</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(contacts)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contacts.find(c => c.id === id)
    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end();
    }
})

app.get('/info', (request, response) => {
    const info = () => {
        const total = contacts.length
        const now = new Date();
        return {
            totalNotes: total,
            currentDate: now
        }
    }
    response.send(`<p>Phonebook has info for ${info().totalNotes} people</p><p>${info().currentDate}</p>`)
})





const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})