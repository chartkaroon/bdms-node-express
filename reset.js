const mongoose = require('mongoose');
const Patient = require('./models/patient');

const mongoDBIP = 'localhost';
const mongoDBPort = 27017;
const mongoDBName = 'patient';
const mongoDBConnStr = `mongodb://${mongoDBIP}:${mongoDBPort}/${mongoDBName}`;

//====================== MOCK DATA ========================
const patients = [
    new Patient({
        patientName: 'Patient AA',
        patientIllness: 'Illness AA'
    }),
    new Patient({
        patientName: 'Patient BB',
        patientIllness: 'Illness BB'
    }),
    new Patient({
        patientName: 'Patient CC',
        patientIllness: 'Illness CC'
    }),
];
//====================== MOCK DATA ========================

// 1. Connect to DB, if the DB hasn't existed yet, it will automatically create new one
mongoose.connect(mongoDBConnStr, {useNewUrlParser: true})
    .then((mongooseObj) => {
        console.log('successfully connected DB with ' + mongoDBConnStr);
    });

// 2. Empty patient collection
Patient.remove({}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Patient collection has been cleared!');

        // 3. insert new patients into the patient collection
        patients.forEach( (eachPatient) => {
            Patient.create(eachPatient, (err, createdPatient) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Added new patient: ' + createdPatient.patientName);
                }
            });
        } );
    }
});


