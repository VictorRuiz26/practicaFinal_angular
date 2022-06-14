const { Router } = require("express");
const { check } = require("express-validator");

const { login } = require("../controllers/auth-controller");
const { validarCampos } = require("../middlewares/validacion");


let router = new Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').notEmpty(),
    check('correo', 'El email no es un Email valido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], login);

module.exports = router;