const express = require('express');
const mongoose = require('mongoose');
const app = express();
const colors = require('colors');
const cbr = console.log(' ');
require('dotenv').config();

const PORT = process.env.PORT;
const {MONGOURI} = require('./config/keys');

require('./models/user');

app.use(express.json());
app.use(require('./routes/auth'));

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose: Connected'.yellow)
});

mongoose.connection.on('error', (error) => {
    console.log('Mongoose: Error Connecting: '.red + error) 
});

app.listen(PORT, () => {
    cbr;
    console.log(`Server Running: http://localhost:${PORT}`.cyan)
});