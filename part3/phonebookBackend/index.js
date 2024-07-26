const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')




let contacts = [
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
app.use(express.static('dist'))
app.use(cors())

app.use(express.json());
app.use(morgan('tiny'))


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

app.post('/api/persons', (request, response) => {
    const name = request.body.name;
    const number = request.body.number;
    let existName = contacts.find(contact => name === contact.name)

    let newContact = {
        id: contacts.length === 0 ? 1 : contacts[contacts.length - 1].id + 1,
        name: name,
        number: number
    }
    if (!name || !number) {
        return response.status(400).json({
            error: 'Name or number cannot be empty.'
        })
    }
    if (existName) {
        return response.status(400).json({
            error: 'Name already exists.'
        })
    }
    contacts.push(newContact);
    response.json(contacts);
});


app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(c => c.id !== id)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

//esto es una prueba 2