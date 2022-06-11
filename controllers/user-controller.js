const jwt_decode = require('jwt-decode');
const User = require("../models/users.model");


const getUsers = async (req, res) => {
    const productos = await User.find({}, {"__v": 0}).populate('padre');
    const total = productos.length;
    res.send({ total, productos });
};

const postUsers = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const token = req.header("Authorization");
    const decoded = jwt_decode(token);
    const padre = decoded.uid;
    const nuevo_usuario = new User({ nombre, correo, password, padre });
    await nuevo_usuario.save();
    res.send(nuevo_usuario);
}

const putUsers = async (req, res) => {
    const id = req.params.id;
    const { _id, ...resto } = req.body;
    await User.findByIdAndUpdate(id, resto);

    const result = await User.findById(id, {"__v": 0});
    res.send(result);
}
const deleteUsers= async (req, res) => {
    const id = req.params.id;

    const producto_eliminado = await User.findById(id, {"__v": 0});

    await User.findByIdAndDelete(id);

    res.send({ producto_eliminado });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}