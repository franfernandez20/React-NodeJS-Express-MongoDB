// import { Schema as _Schema } from 'mongoose'; ES6 way
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: { 
        type: String,
        required: true,
        max: 100 
    },
    price: {
        type: Number,
        required: true 
    },
});

// Exportacion del modelo
module.exports = mongoose.model('Product', ProductSchema);