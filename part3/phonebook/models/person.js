require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)

console.log("attempting to connect")
mongoose.connect(url, {family: 4}).then(response =>
    console.log("connection successful")
).catch(error => {
    console.log("connection unsuccessful")
})

const phoneValidator = (phoneNumber) => {
  const pattern = /^\d{2,3}-\d+$/
  return pattern.test(phoneNumber) ? true : false
}
const personSchema = new mongoose.Schema({
    name: {
      type: String, 
      minLength: 3, 
      required: true
    }, 
    number: {
      type: String, 
      validate: {
        validator: phoneValidator, 
        message: props => `${props.value} does not fit the required format`
      }
    }, 
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phonebook', personSchema)
