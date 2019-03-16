// import { Schema as _Schema } from 'mongoose'; ES6 way
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SaleSchema = new Schema({
    client: String, // TBD --Debera ser una referencia a clientes
    date: Date,
    total: {
        type: Number,
        required: true 
    },
    benefice: Number,
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
            salePrice: Number
        }
    ]
});

// Exportacion del modelo
module.exports = mongoose.model('Sale', SaleSchema);