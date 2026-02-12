const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://fulllstack:${password}@cluster0.hle34il.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, {family : 4})

const personSchema = new mongoose.Schema({
    name: String,
    number: String, 
})

const Person = mongoose.model("Phonebook", personSchema)
if (process.argv.length > 3) {
    curName = process.argv[3]
    curNumber = process.argv[4]
    const phoneEntry = new Person({
        name: curName, 
        number: curNumber
    })
    phoneEntry.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    }
    )
}
else {
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}