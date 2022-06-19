const { Schema, model } = require("mongoose");

const VideoShcema = new Schema({
    nombre: String,
    estado: Boolean,
    usuario: {
        type: Schema.ObjectId, ref: "User"
    },
    categoria: {
        type: Schema.ObjectId, ref: "Category"
    },
    url: String
})

module.exports = model("Video", VideoShcema);