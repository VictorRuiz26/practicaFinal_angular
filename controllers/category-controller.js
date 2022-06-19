const jwt_decode = require('jwt-decode');
const Category = require("../models/categories.model");


const getCategories = async (req, res) => {
    const productos = await Category.find({ estado: true }, { "__v": 0 }).populate('usuario');
    const total = productos.length;
    res.send({ total, productos });
};

const postCategories = async (req, res) => {
    const { nombre, estado = true } = req.body;
    const token = req.header("Authorization");
    const decoded = jwt_decode(token);
    const usuario = decoded.uid;
    const nueva_category = new Category({ nombre, usuario, estado });
    await nueva_category.save();
    res.send(nueva_category);
}

const putCategories = async (req, res) => {
    const id = req.params.id;
    const { _id, ...resto } = req.body;
    await Category.findByIdAndUpdate(id, resto);

    const result = await Category.findById(id, { "__v": 0 });
    res.send(result);
}
const deleteCategories = async (req, res) => {
    const id = req.params.id;

    const producto_eliminado = await Category.findById(id, { "__v": 0 });

    await Category.findByIdAndUpdate(id, { estado: false });

    res.send({ producto_eliminado });
}

module.exports = {
    getCategories,
    postCategories,
    putCategories,
    deleteCategories
}