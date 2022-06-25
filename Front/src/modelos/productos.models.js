import * as controladorP from '../\services\/productos.service.js';

export const pedirProductos = (categ, res) => {
    categ
    ?                        
        controladorP.getByCat(categ, prods => res(prods))       
    : 
        controladorP.getAll(prods => res(prods))
}

export const pedirProducto = (id, res) => {
    controladorP.getById(id, prod => res(prod))       
}

export const pedirProductosTest = (res) => {
    controladorP.getAllTest(prods => res(prods))
}