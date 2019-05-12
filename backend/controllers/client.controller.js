const Client = require('../models/client.model');

// version prueba, sin validaciones 

exports.client_get = (req, res) => {
    client.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data }); // TBD -- Hacer las demas respuestas como esta
    });
};

exports.client_create = (req, res) => {
    const { name, lastname, address, telf, email, dni, description } = req.body;
    let client = new Client (
        {
            name,
            lastname,
            address,
            telf,
            email,
            dni,
            description
        }
    );

    client.save((err) => {
        if (err) {
            return next(err);
        };
        res.sendStatus(200);
    });
};

exports.client_details = (req, res, next) => {
    Client.findById(req.params.id, (err, client) => {
        if (err) return next(err);
        res.send(client);
    });
};

exports.client_find = (req, res, next) => {
    const { name, lastname, address, telf, email, dni, description } = req.query;
    const query = {
        name: new RegExp(name,'i'),
        lastname: new RegExp(lastname,'i'),
        address: new RegExp(address,'i'),
        telf: new RegExp(address,'i'),
        email: new RegExp(address,'i'),
        dni: new RegExp(DNI,'i'),
        description: new RegExp(description,'i')
    }
    Client.find(query, (err, client) => {
        if (err) return next(err);
        return res.json({ success: true, result: client });
    })
}

exports.client_update = (req, res) => {
    Client.findByIdAndUpdate(req.params.id, {$set: req.body }, (err, client) => {
        if (err) return next(err);
        res.send('cliento actualizado correctamente');
    });
};

exports.client_delete = (req, res) => {
    Client.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.send('cliento eliminado correctamente !!');
    })
};