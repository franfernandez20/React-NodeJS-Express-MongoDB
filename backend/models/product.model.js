// import { Schema as _Schema } from 'mongoose'; ES6 way
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: { 
        type: String,
        required: true,
        max: 100 
    },
    pvr: {
        type: Number,
        required: true 
    },
    pvp: Number,
    pvi: Number,
    pc: Number,
    stoked: Boolean,
    stock: Number,
    stockMin: Number,
    category: String,
    description: String
});

// Exportacion del modelo
module.exports = mongoose.model('Product', ProductSchema);