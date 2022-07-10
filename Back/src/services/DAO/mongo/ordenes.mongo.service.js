import "./config.js";
import { OrdenesModel, OrdenesModel_Items } from '../../../models/ordenes.model.js';
import { mailNuevaVenta, smsNuevaVenta, wpNuevaVenta } from '../../notificacion.service.js';
import { OrdenesDAO } from '../clasesDAO.js';

class Ordenes extends OrdenesDAO{
    constructor () {
        super();
        this.generarOrden = this.generarOrden.bind(this);
        this.getById = this.getById.bind(this);
        this.getByUs = this.getByUs.bind(this);
        this.deleteById = this.deleteById.bind(this);
    }

    async generarOrden(carrito, total, cantidad, usuario, res) {
        try {
            // generar el objeto orden
            const orden = {
                total: total,
                cantTotal: cantidad,
                username: usuario.username,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                domicilio: usuario.domicilio,
                localidad: usuario.localidad,
                provincia: usuario.provincia,
                email: usuario.email,
                dni: usuario.dni,
                tel: usuario.tel
            }
            const response = await OrdenesModel.create(orden);
            orden.id = response._id.valueOf();
            orden.items = [];
            for await (let i of carrito) {
                const total = i.cantidad * i.precio;
                const item = {
                    idOrden: orden.id,
                    total: total,
                    cantidad: i.cantidad,
                    nombre: i.nombre,
                    precio: i.precio,
                    sku: i.sku,
                    img: i.img,
                    descrip: i.descrip,
                    stock: i.stock,
                    categ: i.categ
                }
                await OrdenesModel_Items.create(item);
                orden.items.push(item)
            }
            mailNuevaVenta(orden);
            wpNuevaVenta(orden);
            smsNuevaVenta(orden)
            res(orden);
        } catch (err) {
            console.log('ERRORRRRRRRR ', err)
            res(err)
        }
    }

    async getById(id, res) {
        try {
            const response = await OrdenesModel.findOne({_id: id});
            response.items = await OrdenesModel_Items.find({idOrden: id});
            res(response);
        } catch (err) {
            res(err)
        }
    }

    async getByUs(us, res) {
        try {
            let response = await OrdenesModel.find({email: us});
            const ordenes = [];
            for await (let i of response) {
                const item = await OrdenesModel_Items.find({idOrden: i._id.valueOf()});
                ordenes.push({items : item, ...i._doc});
            }
            res(ordenes);
        } catch (err) {
            res(err)
        }         
    }

    async deleteById(id, res) {
        try {
            await OrdenesModel_Items.deleteMany(
                {idOrden: id}
            );
            await OrdenesModel.deleteOne(
                {_id: id}
            );
            res(`Órden con ID ${id} Eliminada ¡¡¡¡`);
        } catch (err) {
            res(err)
        }        
    }
}

export default Ordenes