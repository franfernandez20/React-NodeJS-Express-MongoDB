const Product = require('../models/product.model');

// version prueba, sin validaciones 
exports.test = (req, res) => {
    res.send('Hola desde Test Controller !! ');
};

exports.product_get = (req, res) => {
    Product.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data }); // TBD -- Hacer las demas respuestas como esta
    });
};

exports.product_create = (req, res) => {
    const { name, pvr, pvp, pvi, pc, stoked, stock, stockMin, category, description } = req.body;
    let product = new Product (
        {
            name,
            pvr,
            pvp,
            pvi,
            pc,
            stoked,
            stock,
            stockMin,
            category,
            description
        }
    );

    product.save((err) => {
        if (err) {
            return next(err);
        };
        res.send('Product saved'); // Habria que retornar un 200 ok o similar
    });
};

exports.product_details = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) return next(err);
        res.send(product);
    });
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