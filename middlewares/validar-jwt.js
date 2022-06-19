const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

const validarJWT = async (req, res, next) => {

    if( !req.header('Authorization')){
        return res.status(400).json({
            msg: "No hay token en la peticion"
        })
    }
    
    const [letra, token] = req.header('Authorization').split(" ");

    if (letra != 'Bearer') {
        return res.status(401).json({
            msg: "Token no valido a1111"
        })
    }

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    try {
        // console.log(token);
        const { uid } = jwt.verify(token, process.env.JWTKEY);

        const usuario = await User.findById(uid);

        if( !usuario ){
            return res.status(401).json({
                msg: "Token no valido - usuario inexistente"
            });
        }

        if( !usuario.estado ){
            return res.status(401).json({
                msg: "Token no valido - usuario eliminado"
            });
        }
        
        req.usuario = usuario;

        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json({
            msg: "Token no valido b1111"
        })
    }

    // console.log(token);

    // next();
}

module.exports = {
    validarJWT
}
