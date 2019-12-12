const Patient = require('./../models/patient');

// PATIENT ROUTE HANDLER FUNCTIONS
// POST a patient
exports.postPatient = (req, res) => {
    console.log('At POST /api/v1/patients');

    const newPatient = {
        patientName: req.body.patientName,
        patientIllness: req.body.patientIllness
    };
    const responseData = {
        submitStatus: undefined,
        patientName: req.body.patientName,
        patientIllness: req.body.patientIllness
    };

    // Add new patient to MongoDB
    Patient.create(newPatient, function (err, patient) {
        if (err) {
            responseData.submitStatus = 'fail';
            console.log(`Failed to add patient: ${newPatient.patientName}, ERROR: ${err}`);
            res
                // status code 404 means no resource found in the server side.
                .status(404)
                .json(responseData);
        } else {
            responseData.submitStatus = 'success';
            console.log(`Successfully added new patient: ${patient.patientName}`);
            res
                // status code 201 means new resource has been created in the server side.
                .status(201)
                .json(responseData);
        }
    });
};

// GET all patients
exports.getAllPatients = (req, res) => {
    console.log('At GET /api/v1/patients');

    Patient.find({}, function (err, patients) {
        if (err) {
            console.log('Error - Cannot find patient: ' + err);
            res
                .status(404)
                //we should make the JSON response in 'JSend' format
                .json({
                    status: 'fail',
                    results: '0',
                    data: {
                        patients
                    }
                });
        } else {
            console.log('Found ' + patients.length + ' patient(s)');
            res
                .status(200)
                //we should make the JSON response in 'JSend' format
                .json({
                    status: 'success',
                    results: patients.length,
                    data: {
                        patients
                    }
                });
        }
    });
};