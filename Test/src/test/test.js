import axios  from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const server = process.env.REACT_APP_SERVER;

export default class TestProductos {
    constructor() {
        this.productos = [];
    }

    getById = async (sku) => {
        try {
            const res = await axios.get(`${server}/api/productos/${sku}`);
            this.productos.push(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    getByCat = async (categoria) => {
        try {
            const res = await axios.get(`${server}/api/productos/categoria/${categoria}`);
            res.data.map((prod) => {
                this.productos.push(prod);
            });
        } catch (err) {
            console.log(err);
        }
    }
    
    getAll = async () => {
        try {
            const res = await axios.get(`${server}/api/productos`)
            res.data.map((prod) => {
                this.productos.push(prod);
            });
        } catch (err) {
            console.log(err);
        }
    }

    addOne = async (prod) => {
        try {
            const res = await axios.post(`${server}/api/productos`, prod)
            this.productos.push(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    updateOne = async (sku, prod) => {
        try {
            const res = await axios.put(`${server}/api/productos/${sku}`, prod)
            this.productos = this.productos.filter((p) => p.sku!=sku);
            this.productos.push(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    deleteOne =  async (sku) => {
        try {
            await axios.delete(`${server}/api/productos/${sku}`)
            this.productos = this.productos.filter((p) => p.sku!=sku);
        } catch (err)  {
            console.log(err);
        }
    }
}





