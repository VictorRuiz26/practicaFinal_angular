const { Schema, model } = require("mongoose");

const UserShcema = new Schema({
    nombre: String,
    correo: String,
    rol: String,
    password: String,
    estado: Boolean,
    padre : {
        type: Schema.ObjectId, ref: "User"
    }
})

module.exports = model("Users", UserShcema);