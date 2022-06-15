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

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ... usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}
module.exports = model("User", UserSchema);