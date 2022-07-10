import { config } from "./configSqLite.js";
import knex1 from 'knex';
const knex = knex1(config);
import { UsuariosDAO } from '../clasesDAO.js';

class Usuarios extends UsuariosDAO {
    constructor () {
        super();
        this.knex = knex1(config);
    }

    async altaUsuario(usuario, resUsuario) {
        usuario.created_at = new Date();
        usuario.id = null;
        usuario = await this.knex('usuarios').insert(usuario);
        resUsuario(usuario);
    }

    async modiUsuario(usuario, resUsuario) {
        usuario.updated_at = new Date();
        await this.knex('usuarios').where('id', usuario.id)
            .update({
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                domicilio: usuario.domicilio,
                localidad: usuario.localidad,
                provincia: usuario.provincia,
                email: usuario.email,
                dni: usuario.dni,
                tel: usuario.tel,
                updated_at: usuario.updated_at
            });
        resUsuario(usuario);
    }

    async getById(id, resUsuario) {
        const usuario = await this.knex.select().from('usuarios').where('id', id);
        resUsuario(usuario);            
    }

    async getByMail(email, pass, resUsuarios) {
        const usuario = await knex.select().from('usuarios').where({'email': email, 'pass': pass});
        resUsuarios(usuario);            
    }

    async deleteById(id, res) {
        await this.knex('Usuarios').where('id', id)
            .del();
        res(`Usuario con ID ${id} Eliminado ¡¡¡¡`);            
    }
}

export default Usuarios