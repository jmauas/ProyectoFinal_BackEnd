import 'dotenv/config';
import AxiosMidle from '../midle/axios-midle.js'

const server = process.env.REACT_APP_SERVER;

export const getById = (id, producto) => {
    AxiosMidle.get(`${server}/api/productos/${id}`)
    .then(res => {
        producto(res.data);
    })
    .catch(err => {
        console.log(err);
    })
}

export const getByCat = (categoria, productos) => {
    AxiosMidle.get(`${server}/api/productos/categoria/${categoria}`)
    .then(res => {
        productos(res.data);
    })
    .catch(err => {
        console.log(err);
    })
}

export const getAll = (all) => {
    AxiosMidle.get(`${server}/api/productos`)
    .then(res => {
        all(res.data);
    })
    .catch(err => {
        console.log(err);
    })
}

export const getAllTest = (all) => {
    AxiosMidle.get(`${server}/api/productos-test`)
    .then(res => {
        all(res.data);
    })
    .catch(err => {        
        console.log('Error en Solicitud', err);
    })
}