const Product = require('../models/product.model');

// version prueba, sin validaciones 
exports.test = (req, res) => {
    res.send('Hola desde Test Controller !! ');
};

exports.product_create = (req, res) => {
    let product = new Product (
        {
            name: req.body.name,
            price: req.body.price,
        }
    );

    product.save((err) => {
        if (err) {
            return next(err);
        }
        res.send('Producto creado correctamente'); // Habria que retornar un 200 ok o similar
    })
};

exports.product_details = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_update = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body }, (err, product) => {
        if (err) return next(err);
        res.send('Producto actualizado correctamente');
    });
};

exports.product_delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.send('Producto eliminado correctamente !!');
    })
};