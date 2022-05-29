import "./Mongo/config.js";
import { MensajesModel } from '../models/mensajes.model.js';
import { faker } from '@faker-js/faker';

class Mensajes {
    constructor () {
        this.guardarYMostrar = this.guardarYMostrar.bind(this);
    }

    async guardarYMostrar(socketId, data, res) {
        try {
            const msg = {
                author: {
                    socketId: socketId,
                    id: data.mail,
                    nombre: data.us,
                    apellido: data.apellido,
                    edad: Number(data.edad),
                    alias: data.alias,
                    avatar: faker.image.avatar(),
                    fh: data.fh
                },
                text: data.mensaje,
             }
            await MensajesModel.create(msg);
            const response = await this.Mostrar();
            res(response);
        } catch (err) {
            console.log(err)
        }
    }

    async Mostrar() {
        try {           
            const response = await MensajesModel.find({}).sort({'author.fh': -1});
            return response;
        } catch (err) {
            console.log(err)
        }
    }
}   

export default Mensajes;