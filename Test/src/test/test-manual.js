import TestProductos from "./test.js";
import { productoNuevo, productoAModificar } from '../utils/producto.js';

const pruebas = new TestProductos();

await pruebas.addOne(productoNuevo);
console.log('Agregar', pruebas.productos);

await pruebas.updateOne('652', productoAModificar);
console.log('Modificar', pruebas.productos);

await pruebas.deleteOne('652');
console.log('Eliminar 652', pruebas.productos);

await pruebas.getAll();
console.log('Todos', pruebas.productos);

await pruebas.getByCat('cotillon');
console.log('Categoria Cotillon', pruebas.productos);