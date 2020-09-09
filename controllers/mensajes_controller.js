const Mensaje = require('../models/mensaje');

const getChat = async (req, res) => {
    const miId = req.uid;
    const mensajesDe = req.params.origen;
    console.log(mensajesDe);
    console.log(miId);
    const lastMesanjes = await Mensaje.find({
        $or: [{ origen: miId, destino: mensajesDe }, { origen: mensajesDe, destino: miId }]
    })
    .sort({createdAt: 'desc'})
    .limit(50);

    res.json({
        ok: true,
        msg: 'Mensajes enviados',
        lastMesanjes
    });
}

module.exports = {
    getChat
}