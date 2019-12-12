const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const patientRouter = require('./routes/patientRoutes');

const server = express();
const port = 3333;

// ===================== MONGOOSE ======================
const mongoDBIP = 'localhost';
const mongoDBPort = 27017;
const mongoDBName = 'patient';
const mongoDBConnStr = `mongodb://${mongoDBIP}:${mongoDBPort}/${mongoDBName}`;

// Connect to DB, if the DB hasn't existed yey,it will automatically new one
mongoose.connect(mongoDBConnStr, {useNewUrlParser: true})
    .then((mongooseObj) => {
        console.log('successfully connected DB with ' + mongoDBConnStr);
    });
// ===================== MONGOOSE ======================

// ==================== MIDDLEWARES ====================
// Use express.json() middleware to parse an incoming request
// into JSON format and then assign to 'req' which is available in get,post routing functions below...
server.use(express.json());

// Add CORS middleware To solve the cross-origin issue
server.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
// ==================== MIDDLEWARES ====================

// ======================= ROUTES ======================
server.use('/api/v1/patients', patientRouter);
// ======================= ROUTES ======================

// =================== SERVER START ====================
server.listen(port, () => console.log(`Server started at port ${port}!`));
// =================== SERVER START ====================