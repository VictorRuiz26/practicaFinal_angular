const { Router } = require("express");
const { check } = require("express-validator");


const { getVideos,
    postVideos,
    putVideos,
    deleteVideos } = require("../controllers/video-controller");


const { validarCampos } = require("../middlewares/validacion");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");

/**
 * Se van importando los diferentes controladores creados en la carpeta controllers.
 * Esos controladores constarán simplemente de fuciones como videosGet que se conectarán iternamente con la base de datos 
 * a través del modelo de mongoose creado en el directorio /models
 */

let router = new Router();

router.get('/',[
    validarJWT
], getVideos);

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('url', 'La URL es obligatoria').notEmpty(),
    check('url', 'El formato de URL no es correcto').isURL(),
    check('categoria', 'El video debe pertenecer a una categoría').notEmpty(),
    check('categoria', 'La categoria debe de ser un ID de MongoDB válido').isMongoId(),
    validarCampos
], postVideos);

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El id no es valido').isMongoId(),
    validarCampos
], putVideos);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El id no es valido').isMongoId(),
    validarCampos
], deleteVideos);

module.exports = router;