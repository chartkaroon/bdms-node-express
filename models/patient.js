const mongoose = require('mongoose');

//Define the schema of the data persistent object --- like @Entity class in Java's Hibernate
let patientSchema = new mongoose.Schema({
    patientName: String,
    patientIllness: String
});

//Pair the defined schema with an object in Node.js
// Now we can use this object to CRUD
// **** ALWAYS name it as SINGULAR (without 's') because MongoDB is smart enough to
// create(if the collection not existed yet) or lookup the collection name with 's'
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;