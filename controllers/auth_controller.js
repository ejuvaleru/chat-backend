const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const usuario = require('../models/usuario');

const crearUsuario = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado.'
            });
        }

        const usuario = new Usuario(req.body);

        // Cifrar contraseña del usuario
        const salt = await bcrypt.genSaltSync();
        usuario.password = await bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Usuario creado correctamente.',
            usuario: usuario,
            token
        });
    } catch (error) {
        console.log('error ', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.',
            err: error
        });
    }
}

const iniciarSesion = async (req, res = response) => {
    try {
        const { email, password } = req.body;

        const usuarioDb = await Usuario.findOne({ email });

        if (!usuarioDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo no encontrado.'
            });
        }

        // Validar password
        const validPassword = bcrypt.compareSync(password, usuarioDb.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta.'
            });
        }

        const token = await generarJWT(usuarioDb.id);

        res.json({
            ok: true,
            msg: 'Inicio de sesion exitoso.',
            usuario: usuarioDb,
            token
        });

    } catch (error) {
        console.log('error ', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.',
        });
    }
}

const renewToken = async (req, res = response) => {
    try {
        const uid = req.uid;
        
        const token = await generarJWT(uid);

        const usuarioDb = await Usuario.findById(uid);

        res.json({
            ok: true,
            msg: 'Token renovado correctamente.',
            usuario: usuarioDb,
            token
        });
        
    } catch (error) {
        console.log('error ', error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.',
        });
    }
}

module.exports = {
    crearUsuario,
    iniciarSesion,
    renewToken
}