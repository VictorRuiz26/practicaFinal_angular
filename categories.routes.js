const { Router } = require("express");
const { check } = require("express-validator");


const { getCategories,
    postCategories,
    putCategories,
    deleteCategories } = require("../controllers/category-controller");


const { validarCampos } = require("../middlewares/validacion");

/**
 * Se van importando los diferentes controladores creados en la carpeta controllers.
 * Esos controladores constarán simplemente de fuciones como videosGet que se conectarán iternamente con la base de datos 
 * a través del modelo de mongoose creado en el directorio /models
 */

let router = new Router();

router.get('/', getCategories);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    //check('nombre', 'El nombre no es válido').isString(),
    validarCampos
], postCategories);

router.put('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    validarCampos
], putCategories);

router.delete('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    validarCampos
], deleteCategories);

module.exports = router;