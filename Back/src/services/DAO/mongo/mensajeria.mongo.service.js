import "./config.js";
import { MensajesModel } from '../../../models/mensajes.model.js';
import { faker } from '@faker-js/faker';
import logger from '../../../utils/logger.js';
import { MensajeriaDAO } from '../clasesDAO.js';

class Mensajes extends MensajeriaDAO {
    constructor () {
        super();
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
            logger.error(err)
        }
    }

    async Mostrar() {
        try {           
            const response = await MensajesModel.find({}).sort({'author.fh': -1});
            return response;
        } catch (err) {
            logger.error(err)
        }
    }
}   

export default Mensajes;