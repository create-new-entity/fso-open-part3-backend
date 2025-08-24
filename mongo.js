const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide password')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fso-open:${password}@fso-open.1nrsvjx.mongodb.net/?retryWrites=true&w=majority&appName=fso-open`

mongoose.set('strictQuery',false)

mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length > 3) {
    const name = process.argv[3]
    const number = process.argv[4]

    const newPerson = new Person({ name, number })

    newPerson.save().then((result) => {
        mongoose.connection.close()
    })
}

if(process.argv.length === 3) {
    Person.find({}).then((allPersons) => {
        console.log('phonebook:')
        allPersons.forEach((person) => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} 

