const express = require('express');
const mongoose = require('mongoose');
const app = express();
const colors = require('colors');
const cors = require('cors');
const cbr = console.log(' ');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const {MONGOURI} = require('./config/keys');

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose: Connected'.yellow)
});

mongoose.connection.on('error', (error) => {
    console.log('Mongoose: Error Connecting: '.red + error) 
});

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(cors());

app.use(require('./routes/auth'));
app.use(require('./routes/post'));

app.listen(PORT, () => {
    cbr;
    console.log(`Server Running: http://localhost:${PORT}`.cyan)
});