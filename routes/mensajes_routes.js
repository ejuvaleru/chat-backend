/*
    path: /api]/mensajes
*/

const { Router } = require('express');
// const { } = require('../controllers/');

const { validarJWT } = require('../middleware/validar-jwt');
const { getChat } = require('../controllers/mensajes_controller');

const router = Router();

router.get('/:origen', validarJWT, getChat);

module.exports = router;