const jwt_decode = require('jwt-decode');
const User = require("../models/users.model");
const bcryptjs = require('bcryptjs');

const getUsers = async (req, res) => {
    const productos = await User.find({ estado: true }).populate('padre');
    const total = productos.length;
    res.send({ total, productos });
};

const postUsers = async (req, res) => {
    const { nombre, correo, password, estado = true } = req.body;
    const token = req.header("Authorization");
    const decoded = jwt_decode(token);
    const padre = decoded.uid;
    const nuevo_usuario = new User({ nombre, correo, password, padre, estado });

    // Verificar si el correo existe

    // Encriptar passwd 
    const salt = bcryptjs.genSaltSync();
    nuevo_usuario.password = bcryptjs.hashSync(password, salt);
    // Guardar en BBDD
    await nuevo_usuario.save();
    res.send(nuevo_usuario);
}

const putUsers = async (req, res) => {
    const id = req.params.id;
    // const { _id, ...resto } = req.body;
    const { nombre } = req.body;

    await User.findByIdAndUpdate(id, { nombre: nombre });

    const result = await User.findById(id);
    res.send(result);
}
const deleteUsers = async (req, res) => {
    const id = req.params.id;

    await User.findByIdAndUpdate(id, { estado: false });
    const user = await User.findById(id);
    res.json(user);
    // res.send({ producto_eliminado });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}