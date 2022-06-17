const jwt_decode = require('jwt-decode');
const Category = require("../models/categories.model");


const getCategories = async (req, res) => {
    const productos = await Category.find({}, {"__v": 0}).populate('user');
    const total = productos.length;
    res.send({ total, productos });
};

const postCategories = async (req, res) => {
    const nombre = req.body;
    const token = req.header("Authorization");
    const decoded = jwt_decode(token);
    const user = decoded.uid;
    const nueva_category = new Category({ nombre, user });
    await nueva_category.save();
    res.send(nueva_category);
}

const putCategories = async (req, res) => {
    const id = req.params.id;
    const { _id, ...resto } = req.body;
    await Category.findByIdAndUpdate(id, resto);

    const result = await Category.findById(id, {"__v": 0});
    res.send(result);
}
const deleteCategories= async (req, res) => {
    const id = req.params.id;

    const producto_eliminado = await Category.findById(id, {"__v": 0});

    await Category.findByIdAndDelete(id);

    res.send({ producto_eliminado });
}

module.exports = {
    getCategories,
    postCategories,
    putCategories,
    deleteCategories
}