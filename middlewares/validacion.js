const { validationResult } = require("express-validator");

const validarCampos = async (req, res, next) => {
    // esto lo que hace es comprobar si los middlewares de la ruta han generado algún error o no
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    // Si no ha habido ningún error debemos ejecutar el siguiente middleware, o pasar la petición al controlador asociado si este es el ultimo middleware
    next();
}

module.exports = {
    validarCampos
}