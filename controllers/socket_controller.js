const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado = async (uid = '') => {
    const usuarioDb = await Usuario.findById(uid);
    usuarioDb.online = true;
    await usuarioDb.save();
    return usuarioDb;
}

const usuarioDesconectado = async (uid = '') => {
    const usuarioDb = await Usuario.findById(uid);
    usuarioDb.online = false;
    await usuarioDb.save();
    return usuarioDb;
}

const guardarMensaje = async (payload) => {
    try {
        const mensaje = new Mensaje(payload);
        await mensaje.save();
        return true;
    } catch (error) {
        return false;
    }
}


module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    guardarMensaje
};