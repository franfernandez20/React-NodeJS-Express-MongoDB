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

exports.product_details = (req, res, next) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) return next(err);
        res.send(product);
    });
};

exports.product_find = (req, res, next) => {
    const { name, category, description } = req.query;
    
    /** Comprobacion auxiliar que no son strigns vacios */
    // const isEmptyFunc = (elem, isEmpty) => {
    //     if (typeof elem !== 'undefined' && elem.length === 0)
    //         return true;
    //     return isEmpty;
    // }
    // if (isEmptyFunc(description, isEmptyFunc(category, isEmptyFunc(name,false))))
    //     return res.json({ success: false, error: 'Empty find' });
    /** FIN Comprobacion */
        const query = {
        name: new RegExp(name,'i'),
        category: new RegExp(category,'i'),
        description: new RegExp(description,'i')
    }
    Product.find(query, (err, product) => {
        if (err) res.json({ success: false, error: next(err) });
        return res.json({ success: true, result: product });
    }).limit(100)
}

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