const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a la base de datos');
    } catch (error) {
        throw new Error('Problemas en la conexion con la base de datos');
        
    }
} 

module.exports = {
    dbConnection
}