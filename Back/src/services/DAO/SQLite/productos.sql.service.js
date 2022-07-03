import { config } from "./configSqLite.js";
import knex1 from 'knex';


class Productos {
    constructor () {
        this.knex = knex1(config);
        this.random = Math.random();
    }

    async save(producto, res) {
        try {
            producto.created_at = new Date();
            producto.id = await this.knex('productos').returning('id')
                                    .insert(producto);
            res(producto);
        } catch (err) {
            res(err)
        }
    }

    async modi(producto, res) {
        try {
            producto.updated_at = new Date();
            await this.knex('productos').where('id', producto.id)
                .update({
                    nombre: producto.nombre,
                    descrip: producto.descrip,
                    categ: producto.categ,
                    img: producto.img,
                    precio: producto.precio,
                    stock: producto.stock,
                    sku: producto.sku,
                    updated_at: producto.updated_at
                });
            res(producto);
        } catch (err) {
            res(err)
        } 
    }

    async getById(id, producto) {
        try {
            const prod = await this.knex.select().from('productos').where('sku', id);
            producto(prod[0]);
        } catch (err) {
            producto(err)
        }
    }

    async getByCat(categoria, productos) {
        try {
            const prods = await this.knex.select().from('productos').where('categ', categoria);
            productos(prods);
        } catch (err) {
            productos(err)
        }
    }

    async getAll(all) {
        try {
            const prods = await this.knex.select().from('productos');
            all({productos: prods, random: this.random});
        } catch (err) {
            all(err)
        }
    }

   async deleteById(id) {
       try {
            await this.knex('productos').where('id', id)
                .del();
        } catch (err) {
            console.log(err)
        }
    }
}

export default Productos;