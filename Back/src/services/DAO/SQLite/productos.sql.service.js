import { config } from "./configSqLite.js";
import knex1 from 'knex';
import { ProductosDAO } from '../clasesDAO.js';

class Productos extends ProductosDAO {
    constructor () {
        super();
        this.knex = knex1(config);
    }

    async save(producto) {
        try {
            producto.created_at = new Date();
            producto.id = await this.knex('productos').returning('id')
                                    .insert(producto);
            return producto;
        } catch (err) {
            return err;
        }
    }

    async modi(producto) {
        try {
            producto.updated_at = new Date();
            await this.knex('productos').where('sku', producto.sku)
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
            return producto;
        } catch (err) {
            return err;
        } 
    }

    async getById(sku) {
        try {
            const prod = await this.knex.select().from('productos').where('sku', sku);
            return prod[0];
        } catch (err) {
            return err;
        }
    }

    async getByCat(categoria) {
        try {
            const prods = await this.knex.select().from('productos').where('categ', categoria);
            return prods;
        } catch (err) {
            return err;
        }
    }

    async getAll() {
        try {
            const prods = await this.knex.select().from('productos');
            return prods;
        } catch (err) {
            return err;
        }
    }

   async deleteById(sku) {
       try {
            await this.knex('productos').where('sku', sku)
                .del();
            return '';
        } catch (err) {
            console.log(err)
        }
    }
}

export default Productos;