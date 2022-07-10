import "./config.js";
import { ProductosModel } from '../../../models/productos.model.js';
import logger from '../../../utils/logger.js';
import { ProductosDAO } from '../clasesDAO.js';

class Productos extends ProductosDAO {
    constructor () {
        super();
        this.save = this.save.bind(this);
        this.modi = this.modi.bind(this);
        this.getById = this.getById.bind(this);
        this.getByCat = this.getByCat.bind(this);
        this.getAll = this.getAll.bind(this);
        this.deleteById = this.deleteById.bind(this);
        this.random = Math.random();
    }

    async save(producto) {
        try {
            producto.created_at = new Date();
            return  await ProductosModel.create(producto);
        } catch (err) {
            logger.error(err);
            return err;
        }
    }

    async modi(producto) {
        try {
            producto.updated_at = new Date();
            const response = await ProductosModel.updateOne(
                {sku: producto.sku},
                {
                    nombre: producto.nombre,
                    descrip: producto.descrip,
                    categ: producto.categ,
                    img: producto.img,
                    precio: producto.precio,
                    stock: producto.stock,
                    sku: producto.sku,
                    updated_at: producto.updated_at
                }
            );
            return producto;
        } catch (err) {
            return err;
        } 
    }

    async getById(sku) {
        try {
            return await ProductosModel.findOne({sku: sku});
        } catch (err) {
            return err;
        }
    }

    async getByCat(categoria) {
        try {
            return  await ProductosModel.find({categ: categoria});
        } catch (err) {
            return err;
        }
    }

    async getAll() {
        try {
            const response = await ProductosModel.find({});
            return response;
        } catch (err) {
            console.log(err)
            return err
        }
    }

    async deleteById(sku) {
        try {
            const response = await ProductosModel.deleteOne(
                {sku: sku}
            );
            return response;
        } catch (err) {
            return err;
        }
    }
}

export default Productos;