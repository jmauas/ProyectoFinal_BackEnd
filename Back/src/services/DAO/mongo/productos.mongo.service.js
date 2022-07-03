import "./config.js";
import { ProductosModel } from '../../../models/productos.model.js';
import logger from '../../../utils/logger.js';

class Productos {
    constructor () {
        this.save = this.save.bind(this);
        this.modi = this.modi.bind(this);
        this.getById = this.getById.bind(this);
        this.getByCat = this.getByCat.bind(this);
        this.getAll = this.getAll.bind(this);
        this.deleteById = this.deleteById.bind(this);
        this.random = Math.random();
    }

    async save(producto, res) {
        try {
            const response = await ProductosModel.create(producto);
            res(response);
        } catch (err) {
            logger.info(err)
        }
    }

    async modi(producto, res) {
        try {
            producto.updated_at = new Date();
            const response = await ProductosModel.updateOne(
                {_id: producto._id},
                {
                    nombre: producto.nombre,
                    descrip: producto.descrip,
                    categ: producto.categ,
                    img: producto.img,
                    precio: producto.precio,
                    stock: producto.stock,
                    sku: producto.sku,
                    updated_at: producto.updated_at
            });
            res(response);
        } catch (err) {
            res(err)
        } 
    }

    async getById(id, res) {
        try {
            const response = await ProductosModel.findOne({sku: id});
            res(response);
        } catch (err) {
            res(err)
        }
    }

    async getByCat(categoria, res) {
        try {
            const response = await ProductosModel.find({categ: categoria});
            res(response);
        } catch (err) {
            res(err)
        }
    }

    async getAll(res) {
        try {
            const response = await ProductosModel.find({});
            res({productos: response, random: this.random});
        } catch (err) {
            res(err)
        }
    }

   async deleteById(id) {
       try {
        const response = await ProductosModel.deleteOne(
            {_id: id}
        );
        res(response)
        } catch (err) {
            res(err)
        }
    }
}

export default Productos;