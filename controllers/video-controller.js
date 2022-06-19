const jwt_decode = require('jwt-decode');
const Video = require("../models/videos.model");

const getVideos = async (req, res) => {
    const productos = await Video.find({ estado: true }, { "__v": 0 }).populate("usuario categoria");
    const total = productos.length;
    res.send({ total, productos });
};

const postVideos = async (req, res) => {
    const { nombre, url, categoria, estado = true } = req.body;

    const token = req.header("Authorization");
    const decoded = jwt_decode(token);
    const usuario = decoded.uid;
    const nuevo_video = new Video({ nombre, url, usuario, categoria, estado });
    await nuevo_video.save();
    res.send(nuevo_video);
}

const putVideos = async (req, res) => {
    const id = req.params.id;

    const { _id, ...resto } = req.body;

    await Video.findByIdAndUpdate(id, resto);

    const result = await Video.findById(id, { "__v": 0 });
    res.send(result);
}
const deleteVideos = async (req, res) => {
    const id = req.params.id;

    const producto_eliminado = await Video.findById(id, { "__v": 0 });

    await Video.findByIdAndUpdate(id, { estado: false });

    res.send({ producto_eliminado });
}

module.exports = {
    getVideos,
    postVideos,
    putVideos,
    deleteVideos
}