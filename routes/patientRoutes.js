const express = require('express');
const router = express.Router();
const patientController = require('./../controllers/patientController');

// PATIENT ROUTES
router.route('/')
    .get(patientController.getAllPatients)
    .post(patientController.postPatient);

module.exports = router;