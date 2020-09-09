/*
    path: api/usuarios
*/

const { Router } = require('express');
const {getUsuarios } = require('../controllers/usuarios_controller');

const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

module.exports = router;