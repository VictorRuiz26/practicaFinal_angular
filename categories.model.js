const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    nombre: String,
    user : {
        type: Schema.ObjectId, ref: "User"
    }
})

module.exports = model("Categories", CategorySchema);