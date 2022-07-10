import { config } from "./configSqLite.js";
import knex1 from 'knex';
import { MensajeriaDAO } from '../clasesDAO.js';

class Mensajes extends MensajeriaDAO {
    constructor () {
        super();
        this.knex = knex1(config);
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
            await this.knex('mensajes').insert(msg);
            const response = await this.Mostrar();
            res(response);
        } catch (err) {
            logger.error(err)
        }
    }
    async Mostrar() {
        try {           
            const response = await this.knex.select().from('mensajes');
            return response;
        } catch (err) {
            logger.error(err)
        }
    }
}

export default Mensajes;