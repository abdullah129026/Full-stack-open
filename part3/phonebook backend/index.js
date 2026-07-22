require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const { mongoose, isConnected: mongoConnected } = require('./utils/db')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let inMemoryPersons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]

const useDatabase = () => {
  try {
    return mongoConnected && mongoose.connection.readyState === 1
  } catch {
    return false
  }
}

app.get('/api/persons', async (request, response) => {
  try {
    if (useDatabase()) {
      const persons = await Person.find({})
      response.json(persons)
    } else {
      response.json(inMemoryPersons)
    }
  } catch (error) {
    response.status(500).json({ error: 'error retrieving persons' })
  }
})

app.get('/api/persons/:id', async (request, response) => {
  try {
    if (useDatabase()) {
      const person = await Person.findById(request.params.id)
      if (person) {
        response.json(person)
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    } else {
      const person = inMemoryPersons.find(p => p.id === request.params.id)
      if (person) {
        response.json(person)
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    }
  } catch (error) {
    response.status(400).json({ error: 'invalid id' })
  }
})

app.delete('/api/persons/:id', async (request, response) => {
  try {
    if (useDatabase()) {
      const person = await Person.findByIdAndDelete(request.params.id)
      if (person) {
        response.json(person)
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    } else {
      const index = inMemoryPersons.findIndex(p => p.id === request.params.id)
      if (index !== -1) {
        const deletedPerson = inMemoryPersons.splice(index, 1)
        response.json(deletedPerson[0])
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    }
  } catch (error) {
    response.status(400).json({ error: 'invalid id' })
  }
})

app.post('/api/persons', async (request, response) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name and number are required' })
  }

  try {
    if (useDatabase()) {
      const person = new Person({ name, number })
      const savedPerson = await person.save()
      response.status(201).json(savedPerson)
    } else {
      if (inMemoryPersons.some(p => p.name === name)) {
        return response.status(400).json({ error: 'name must be unique' })
      }
      const newPerson = {
        id: String(Math.floor(Math.random() * 1000000)),
        name,
        number
      }
      inMemoryPersons.push(newPerson)
      response.status(201).json(newPerson)
    }
  } catch (error) {
    if (error.code === 11000) {
      return response.status(400).json({ error: 'name must be unique' })
    }
    response.status(400).json({ error: error.message })
  }
})

app.get('/info', async (request, response) => {
  try {
    let count
    if (useDatabase()) {
      count = await Person.countDocuments({})
    } else {
      count = inMemoryPersons.length
    }
    const time = new Date().toString()
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${time}</p>
    `)
  } catch (error) {
    response.status(500).json({ error: 'error retrieving info' })
  }
})

app.get('/', (request, response) => {
  response.sendFile('dist/index.html', { root: __dirname })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
