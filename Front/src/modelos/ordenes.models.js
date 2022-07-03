import * as controladorC from '../controlers/ordenes.controler.js';

export const pedirOrdenes = (mail, res) => {
    controladorC.getByUs(mail, ordenes => res(ordenes))          
}

export const pedirOrden = (id, res) => {
    controladorC.getById(id, orden => res(orden))       
}

export const nuevaOrden = (usuario, carrito, total, cantidad, res) => {
    controladorC.nuevaOrden(usuario, carrito, total, cantidad, orden => {
        res(orden);
    })
}