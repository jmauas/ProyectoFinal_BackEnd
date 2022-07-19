import ProductosDTO from '../services/DTO/productos.DTO.js';
import logger from '../utils/logger.js';
import Productos from '../services/DAO/productos.service.js';
import Mensajes from '../services/DAO/mensajeria.service.js';
import Usuarios from '../services/DAO/usuarios.service.js';


const prod = Productos.initInstancia();
const mensajes = Mensajes.initInstancia();
const usuarios = Usuarios.initInstancia();

export const productos = async () => {
    const productos = await prod.getAll();
    return productos;
}

export const producto = async ({ sku }) => {
    const producto = await prod.getById(sku);
    return producto;
}

export const productoCat = async ({ categ }) => {
    const productos = await prod.getByCat(categ);
    return productos;
}

export const mensajesGet = async () => {
    const mensajes = await mensajes.mostrar();
    return mensajes;
}

export const usuarioGet = async () => {
    const usuario = await usuarios.getByMail(email);
    return usuario;
}


export const createProducto = async ({ producto }) => {
    const { nombre, descrip, categ, img, precio, stock, sku } = producto;
    const productoNuevo = {
        categ,
        descrip,
        nombre,
        img,
        precio, 
        sku, 
        stock
    }
    logger.info(`Post Productos/ Producto: ${JSON.stringify(productoNuevo)} `);
    const produc = await  prod.save(productoNuevo);
    return ProductosDTO(produc);
}

export const updateProducto = async ({ sku, producto }) => {
    const { nombre, descrip, categ, img, precio, stock } = producto;
    const productoNuevo = {
        categ,
        descrip,
        nombre,
        img,
        precio, 
        sku, 
        stock
    }
    logger.info(`Put Productos/ Producto: ${JSON.stringify(productoNuevo)}`);
    const produc = await  prod.update(sku, productoNuevo);
    return ProductosDTO(produc);
}

export const deleteProducto = async ({ sku }) => {
    logger.info(`Delete Productos/ Producto: ${sku}`);
    const produc = await  prod.deleteById(sku);
    return produc;
}

export const createMensaje = async ({ mensaje }) => {
    const { socketId, nombre, apellido, edad, alias, avatar, fh, text } = mensaje;
    const mensajeNuevo = {
        socketId,
        nombre,
        apellido,
        edad,
        alias,
        avatar,
        fh,
        text
    }
    logger.info(`Post Mensajes/ Mensaje: ${JSON.stringify(mensajeNuevo)}`);
    const mensajeCreado = await  mensajes.guardarYMostrar(socketId, mensajeNuevo);
    return mensajeCreado;
}

export const createUsuario = async ({ usuario }) => {
    const { username, nombre, apellido, domicilio, localidad, provincia, email, dni, codPais, tel, password, img } = usuario;
    const usuarioNuevo = {
        username,
        nombre,
        apellido,
        domicilio,
        localidad,
        provincia,
        email,
        dni,
        codPais,
        tel,
        password,
        img
    }
    logger.info(`Post Usuarios/ Usuario: ${JSON.stringify(usuarioNuevo)} `);
    const usuarioCreado = await  usuarios.altaUsuario(usuarioNuevo);
    return usuarioCreado;
}
export const updateUsuario = async ({ email, usuario }) => {
    const { username, nombre, apellido, domicilio, localidad, provincia, dni, codPais, tel, password, img } = usuario;
    const usuarioNuevo = {
        username,
        nombre,
        apellido,
        domicilio,
        localidad,
        provincia,
        email,
        dni,
        codPais,
        tel,
        password,
        img
    }
    logger.info(`Put Usuarios/ Usuario: ${JSON.stringify(usuarioNuevo)}`);
    const usuarioModi = await  usuarios.modiUsuario(usuarioNuevo);
    return usuarioModi;
}

export const deleteUsuario = async ({ email }) => {
    logger.info(`Delete Usuarios/ Usuario: ${email}`);
    const usuario = await  usuarios.deleteById(id);
    return usuario;
}
