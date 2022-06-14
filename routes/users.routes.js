const { Router } = require("express");
const { check } = require("express-validator");


const { getUsers,
    postUsers,
    putUsers,
    deleteUsers } = require("../controllers/user-controller");
    
    
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos, validarUsuario } = require("../middlewares/validacion");
const { esAdminRole, tieneRole } = require("../middlewares/validar-roles");

/**
 * Se van importando los diferentes controladores creados en la carpeta controllers.
 * Esos controladores constarán simplemente de fuciones como videosGet que se conectarán iternamente con la base de datos 
 * a través del modelo de mongoose creado en el directorio /models
 */

let router = new Router();

router.get('/',[
    validarJWT,
    esAdminRole,
    validarCampos
], getUsers);

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre', 'El nombre no es válido').isString(),
    check('correo', 'El email es obligatorio').notEmpty(),
    check('correo',"El email no es correcto").isEmail(),
    check('correo').custom(validarUsuario),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('password', 'La contraseña no es valida').isLength({ min: 6, max: 20 }),
    check('password', 'La contraseña no es valida').matches('^(?=.*[0-9])(?=.*[A-Z]).{8,32}'),
    validarCampos
], postUsers);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El id no es valido').isMongoId(),
    validarCampos
], putUsers);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    // tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'El id no es valido').isMongoId(),
    validarCampos
], deleteUsers);

module.exports = router;