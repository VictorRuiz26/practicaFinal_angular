const { response } = require("express");
const User = require('../models/users.model');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await User.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no es correcto'
            });
        };
        // Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario no es correcto - el estado es false'
            });
        };
        // Verificar password
        const passwdValida = bcryptjs.compareSync(password, usuario.password);
        if (!passwdValida) {
            return res.status(400).json({
                msg: 'El usuario no es correcto - passwd'
            })
        }

        // Generar passwd
        const token = await generarJWT( usuario._id );

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: 'Error en la autenticación'
        })
    }

    // res.json({
    //     msg: "login ok"
    // })
}

module.exports = {
    login
}