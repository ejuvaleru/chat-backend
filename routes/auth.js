/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, iniciarSesion, renewToken } = require('../controllers/auth_controller');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es un campo obligatorio.').not().isEmpty(),
    check('email', 'Formato de correo incorrecto.').isEmail(),
    check('password', 'La contraseña es un campo es obligatorio.').not().isEmpty(),
    validarCampos
], crearUsuario);

router.post('/', [
    check('email', 'El email es un campo obligatorio.').isEmail(),
    check('password', 'La contraseña es un campo obligatorio.').not().isEmpty(),
    validarCampos
], iniciarSesion);

router.get('/renew', validarJWT, renewToken);

module.exports = router;