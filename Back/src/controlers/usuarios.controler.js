import "./Mongo/config.js";
import { UsuariosModel } from '../models/usuarios.model.js';

class Usuarios {
    constructor () {
        this.altaUsuario = this.altaUsuario.bind(this);
        this.modiUsuario = this.modiUsuario.bind(this);
        this.getById = this.getById.bind(this);
        this.getByMail = this.getByMail.bind(this);
        this.deleteById = this.deleteById.bind(this);
    }

    async altaUsuario(usuario, res) {
        try {
            usuario.created_at = new Date();
            const response = await UsuariosModel.create(usuario);
            res(response);
        } catch (err) {
            res(err)
        }     
    }

    async modiUsuario(usuario, res) {ç
        try {
            usuario.updated_at = new Date();
            const response = await UsuariosModel.updateOne(
                {_id: usuario._id},
                {
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    domicilio: usuario.domicilio,
                    localidad: usuario.localidad,
                    provincia: usuario.provincia,
                    email: usuario.email,
                    dni: usuario.dni,
                    tel: usuario.tel,
                    updated_at: usuario.updated_at,
                    pass: usuario.pass
                });
            res(response);
        } catch (err) {
            res(err)
        }     
    }

    async getById(id, res) {
        try {
            const response = await UsuariosModel.findOne({_id: id});
            res(response);            
        } catch (err) {
            res(err)
        }     
    }

    async getByMail(email, pass, res) {
        try {
            const response = await UsuariosModel.find({email: email, pass: pass});
            res(response);      
        } catch (err) {
            res(err)
        }           
    }

    async deleteById(id, res) {
        try {
            await UsuariosModel.deleteOne(
                {_id: id}
            );
            res(`Usuario con ID ${id} Eliminado ¡¡¡¡`);            
        } catch (err) {
            res(err)
        }     
    }
}

export default Usuarios