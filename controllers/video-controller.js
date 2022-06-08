const Video = require("../models/videos.model");

const getVideos = async (req, res) => {
    const productos = await Video.find({}, {"__v": 0}).populate("usuario categoria");
    const total = productos.length;
    res.send({ total, productos });
};

const postVideos = async (req, res) => {
    const { nombre, url, categoria } = req.body;

    const nuevo_video = new Video({ nombre, url, categoria });
    await nuevo_video.save();
    res.send(nuevo_video);
}

const putVideos = async (req, res) => {
    const id = req.params.id;

    const { _id, ...resto } = req.body;

    await Video.findByIdAndUpdate(id, resto);

    const result = await Video.findById(id, {"__v": 0});
    res.send(result);
}
const deleteVideos = async (req, res) => {
    const id = req.params.id;

    const producto_eliminado = await Video.findById(id, {"__v": 0});

    await Video.findByIdAndDelete(id);

    res.send({ producto_eliminado });
}

module.exports = {
    getVideos,
    postVideos,
    putVideos,
    deleteVideos
}