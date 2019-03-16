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

// POST -- sales/betacreate
/* saleProduct = Agrupar el precio que el producto toma para la venta
    { 
        product: idProduct,
        salePrice: number 
    }
    saleProducts = [saleProduct]
*/
exports.sale_products_create = (req, res, next) => {
    const { client, date, total, benefice, products } = req.body;
    
    const errors = [];
    const promises = [];
    products.forEach(saleProduct => {
        let { product, salePrice } = saleProduct;
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
        let promise = newProduct.save().then((result) => { return { product: result._id, salePrice }});
        promises.push(promise);
    });

    Promise.all(promises).then(saleProducts => {
        const sale = new Sale({
            client,
            date,
            total,
            benefice,
            products: saleProducts,
        });
        sale.save((err) => {
            if (err) {
                return next(err);
            }
            res.json({ success: true});
        });
    });
}

exports.sales_get_all = (req, res) => {
    Sale.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data }); // TBD -- Hacer las demas respuestas como esta
      });
}

exports.sale_details = (req, res) => {
    Sale.findById(req.params.id, (err, sale) => {
        if (err) return next(err);
        res.send(sale);
    })
};

exports.sale_update = (req, res) => {
    Sale.findByIdAndUpdate(req.params.id, {$set: req.body }, (err, product) => {
        if (err) return next(err);
        res.send('Sale updated');
    });
};

exports.sale_delete = (req, res) => {
    Sale.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.send('Sale deleted');
    })
};

exports.sales_by_date = (req, res, next) => {
    const { from, to } = req.query;
    console.log('from:', new Date(from))
    const query = {
        date: { $gte: new Date(parseInt(from,10)), $lt: new Date(parseInt(to,10)) }
    }
    Sale.find(query, (err, sales) => {
        if (err) return next(err);
        return res.json({ success: true, result: sales });
    })
}