import 'dotenv/config';
import AxiosMidle from '../midle/axios-midle.js'

const server = process.env.REACT_APP_SERVER;

export const getById = async (id, orden) => {
    await AxiosMidle.get(`${server}/api/usuario/${id}`)
    .then(res => {
        orden(res.data);
    })
    .catch(err => {
        console.log(err);
    })
}

export const getByUs = async (mail, pass, us) => {
    const json = {username: mail, password: pass}
    await AxiosMidle.post(`${server}/api/usuario/login/`, json)
    .then(res => {
        us(res.data);
    })
    .catch(err => {
        console.log(err);
    })
}

export const nuevoUsuario = async (usuario, res) => {
    await AxiosMidle.post(`${server}/api/usuario`, usuario)
    .then(res2 => {
        res(res2.data);
    })
    .catch(err => {
        console.log(err);
    })
}

export const logOut = async (us) => {
    await AxiosMidle.get(`${server}/api/usuario/logout/`)
    .then(res => {
        us();
    })
    .catch(err => {
        console.log(err);
    })
}