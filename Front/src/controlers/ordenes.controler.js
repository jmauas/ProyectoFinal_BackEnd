import 'dotenv/config';
import AxiosMidle from '../midle/axios-midle.js'

const server = process.env.REACT_APP_SERVER;

export const getById = async (id, orden) => {
    await AxiosMidle.get(`${server}/api/carrito/${id}`)
    .then(res => {
        orden(res.data);
    })
    .catch(err => {
        console.log(err);
    })
}

export const getByUs = async (mail, ordenes) => {
    await AxiosMidle.get(`${server}/api/carrito/usuario/${mail}`)
    .then(res => {
        ordenes(res.data);
    })
    .catch(err => {
        console.log(err);
    })
}

export const nuevaOrden = async (usuario, carrito, total, cantidad, orden) => {
    await AxiosMidle.post(`${server}/api/carrito`, {
        usuario: usuario,
        carrito: carrito,
        total: total,
        cantidad: cantidad
    })
    .then(res => {
        orden(res.data);
    })
    .catch(err => {
        console.log(err);
    })
}

