const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    nombre: String,
    estado: Boolean,
    usuario : {
        type: Schema.ObjectId, ref: "User"
    }
})

module.exports = model("Category", CategorySchema);