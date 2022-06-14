const { validationResult } = require("express-validator");
const User = require("../models/users.model");

const validarCampos = async (req, res, next) => {
    // esto lo que hace es comprobar si los middlewares de la ruta han generado algún error o no
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    // Si no ha habido ningún error debemos ejecutar el siguiente middleware, o pasar la petición al controlador asociado si este es el ultimo middleware
    next();
}

const validarUsuario = async correo => {

    // return User.findOne({ where: { correo: value } })
    //     .then(() => {
    //         return Promise.reject('Email already taken')
    //     })

    const existRol = await User.findOne({ correo });

    if (existRol) {

        throw new Error(`El email ${correo} ya está registrado en la BBDD`);

    }

}

module.exports = {
    validarCampos,
    validarUsuario
}