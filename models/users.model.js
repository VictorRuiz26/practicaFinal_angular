const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    nombre: String,
    correo: String,
    rol: String,
    password: String,
    estado: Boolean,
    padre : {
        type: Schema.ObjectId, ref: "User"
    }
})

module.exports = model("User", UserSchema);