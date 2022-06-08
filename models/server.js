const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/dbConnection');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.port;
        /**
         * Aqui se definen las rutas que va a tener nuestro servidor, para tener a la vista qué endpoints tiene asignado
         */
        this.videoPath = '/api/videos';


        // Se inician los métodos de middlewares y rutas en el constructor, para que cuando se instancie la clase se generen.
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // CORS para compatibilidad de dominio cruzado
        this.app.use(cors());

        // Parseo a json
        this.app.use(express.json());

        // Directorio estático en /public
        this.app.use(express.static('public'));
    }

    routes() {
        /**
         * en el crud al que hagamos referencia, sus endpoints serán referidos a la ruta a la que se le aplica el middleware.
         * aqui asociamos rutas a cada Path, y dentro del fichero de rutas se asociará cada ruta (referida a este path) con su controlador.
         * Se hace de esta manera para aplicar middlewares en el fichero de rutas.
         */
        // this.app.use(this.videoPath, require('../routes/ejemplo.routes'));
        this.app.use(this.videoPath, require("../routes/videos.routes"));
    }

    async start(){
        await dbConnection();

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }
}

module.exports = Server;