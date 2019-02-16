const mongoose = require('mongoose');

const Sale = require('../models/sale.model');
const Product = require('../models/product.model');

// version prueba, sin validaciones 
exports.test = (req, res) => {
    res.send('Hola desde Sales Controller !! ');
};

exports.sale_create = (req, res) => {
    const { client, date, total, benefice, products } = req.body;
    let sale = new Sale({
        client,
        date,
        total,
        benefice,
        products
    });

    sale.save((err) => {
        if (err) {
            return next(err);
        }
        res.send('Sale saved'); // TBD --Habria que retornar un 200 ok o similar
    });
};

exports.sale_products_create = (req, res) => {
    const { client, date, total, benefice, products } = req.body;
    
    const errors = [];
    const promises = [];
    products.forEach(product => {
        let newProduct = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: product.name,
            pvr: product.pvr,
            pvp: product.pvp,
            pvi: product.pvi,
            pc: product.pc,
            stoked: product.stocked,
            stock: product.stock,
            stockMin: product.stockMin,
            category: product.category,
            description: product.description
        })
        // TBD -- Hay que tratar el error puede asigmarse a la venta mal si alguno no se guarda
        // let promise = newProduct.save((err) => {
        //     if (err) {
        //         errors.push({ error: err, id: newProduct._id, type: 'Product' });
        //         // return next(err); // TBD -- Demomento controlamos el error enviandolo. Pueden haberse guardado algun producto ya
        //     } else {
        //         ids.push(newProduct._id);
        //         console.log('ids En cada product:', ids)
        //         return ids;
        //     }
        // });
        let promise = newProduct.save().then((result) => result._id);
        promises.push(promise);
    });

    Promise.all(promises).then(productIds => {
        const sale = new Sale({
            client,
            date,
            total,
            benefice,
            products: productIds,
        });
        sale.save((err) => {
            if (err) {
                return next(err);
            }
            res.send('Sale + products saved'); // TBD --Habria que retornar un 200 ok o similar
        });
    });
}

exports.sale_details = (req, res) => {
    Product.findById(req.params.id, (err, sale) => {
        if (err) return next(err);
        res.send(sale);
    })
};

exports.sale_update = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body }, (err, product) => {
        if (err) return next(err);
        res.send('Sale updated');
    });
};

exports.sale_delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.send('Sale deleted');
    })
};