// import { Schema as _Schema } from 'mongoose'; ES6 way
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClientSchema = new Schema({
    name: { 
        type: String,
        required: true,
        max: 100 
    },
    lastname: String,
    address: String,
    dni: String,
    telf: String,
    email: String,
    description: String
});

// Exportacion del modelo
module.exports = mongoose.model('Client', ClientSchema);