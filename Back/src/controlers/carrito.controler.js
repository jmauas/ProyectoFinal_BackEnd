import "./Mongo/config.js";
import { OrdenesModel, OrdenesModel_Items } from '../models/ordenes.model.js';

class Ordenes {
    constructor () {
        this.generarOrden = this.generarOrden.bind(this);
        this.getById = this.getById.bind(this);
        this.getByUs = this.getByUs.bind(this);
        this.deleteById = this.deleteById.bind(this);
    }

    async generarOrden(datos, carrito, total, cantTotal, res) {
        try {
            // generar el objeto orden
            const orden = {
                total: total,
                cantTotal: cantTotal,
                fh: new Date(),
                ...datos
            }
            const response = await OrdenesModel.create(orden);
            orden.id = response._id;
            for await (let i of carrito) {
                i.idOrden = orden.id;
                await OrdenesModel_Items.create(i);
            }
            res(orden);
        } catch (err) {
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
            const response = await OrdenesModel.find({mail: us});
            for await (let i of response) {
                i.items = await OrdenesModel_Items.find({idOrden: i._id});
            }
            res(response);
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