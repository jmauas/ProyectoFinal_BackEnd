import { config } from "./configSqLite.js";
import knex1 from 'knex';
import { mailNuevaVenta, smsNuevaVenta, wpNuevaVenta } from '../../notificacion.service.js';

class Ordenes {
    constructor () {
        this.knex = knex1(config);
    }

    async generarOrden(carrito, total, cantidad, usuario, resOrden) {
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
        orden.id = await this.knex('ordenes').returning('id')
                        .insert(orden);
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
            await this.knex('ordenes_items').insert(item);
        }
        mailNuevaVenta(orden);
        wpNuevaVenta(orden);
        smsNuevaVenta(orden)
        resOrden(orden);
    }

    async getById(id, resOrden) {
        const orden = await this.knex.select().from('ordenes').where('id', id);
        orden.items = await this.knex.select().from('ordenes_items').where('idOrden', id);
        resOrden(orden);
    }

    async getByUs(us, resOrdenes) {
        const ordenes = await this.knex.select().from('ordenes').where('email', us);
        for await (let i of ordenes) {
            i.items = await this.knex.select().from('ordenes_items').where('idOrden', i.id);
        }
        resOrdenes(ordenes);            
    }

    async deleteById(id, res) {
        await this.knex('ordenes_items').where('idOrden', id)
            .del();
        await this.knex('ordenes').where('id', id)
            .del();
        res(`Órden con ID ${id} Eliminada ¡¡¡¡`);            
    }
}

export default Ordenes