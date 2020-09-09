const { response } = require("express");

const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) => {
    try {

        const desde = Number(req.query.desde) || 0;

        const usuarios = await Usuario
                        .find({_id: {$ne: req.uid}})
                        .sort('-online')
                        .skip(desde)
                        .limit(20);

        if(usuarios.length > 0) {
            res.json({
                ok: true,
                msg: 'Usuarios encontrados',
                usuarios,
            });
        } else {
            res.json({
                ok: true,
                msg: 'Ningún usuario encontrado.',
                usuarios: []
            });  
        }
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getUsuarios
}