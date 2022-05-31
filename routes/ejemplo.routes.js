const { Router } = require("express");
const { check } = require("express-validator");


const { validarCampos } = require("../middlewares/validacion");

/**
 * Se van importando los diferentes controladores creados en la carpeta controllers.
 * Esos controladores constarán simplemente de fuciones como videosGet que se conectarán iternamente con la base de datos 
 * a través del modelo de mongoose creado en el directorio /models
 */
// const { controlador } = require('../controllers/controladorVideo');

let router = new Router();

/**
 * en el objeto router se irán asignando los controladores de la siguiente manera:
 * 
 * 1. petición Get: router.get('/', controladorGet);
 *  - Si se desea se puede aplicar subrutas a la ruta principal que se ha asignado en la clase Server, de la siguiente manera:
 *      router.get('/subruta', controladorSubRuta);
 * 
 * 2. petición Post, aquí se pueden aplicar ciertos middlewares importados del paquete "express-validator" función check
 *      router.post('/',[
 *              check('<campo del objeto json a comprobar>', 'Mensaje de error').not().isEmpty(),
 *                  -> este middleware lo que hace es que el campo que se quiera comprobar exista, si no existe lo que hace check() 
 *                      añadir a la cabecera de la petición (req) un objeto errores, que deberemos comprobar con una función ubicada
 *                      en el directorio helpers si algún middleware no se ha pasado.
 *              check('url', 'la Url no está en el formato correcto').isURL(),
 *              validarCampos
 *                  -> esta funcion estará ubicada en el directorio helpers, y es la que comprueba si han pasado o no los middlewares
 *      ], controladorPost);
 * 
 * 3. petición put.
 *      router.put('/:id'[
 *          check('id', 'El id debe de ser uno válido de Mongo).idMongoId(),
 *          validarCampos
 *      ], controladorPut);
 * 
 * 
 */