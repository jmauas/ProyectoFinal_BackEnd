import TestProductos from './test/test.js';
import { strictEqual } from 'assert';
import { productoNuevo, productoAModificar } from './utils/producto.js';

describe('Test de CRUD de Productos', () => {
    it('Deberia Agregar un Nuevo Producto, y devolverlo', async () => {
        const prueba = new TestProductos;
        await prueba.addOne(productoNuevo);
        const producto = await prueba.getById(productoNuevo.sku);
        strictEqual(productoNuevo.nombre, producto.nombre);
    });

    it('Deberia Modificar El Nombre del Producto, y devolverlo', async () => {       
        const prueba = new TestProductos;
        await prueba.updateOne(productoAModificar.sku, productoAModificar);
        const producto = await prueba.getById(productoAModificar.sku);
        strictEqual(productoAModificar.nombre, producto.nombre);
    });

    it('Deberia Eliminar el Producto', async () => {
        const sku = '652';
        const prueba = new TestProductos;
        await prueba.deleteOne(sku);
        const producto = prueba.productos.find(prod => prod.sku === sku);
        strictEqual(producto, undefined);
    });

    it('Deberia Traer al Menos Un Producto.', async () => {
        const prueba = new TestProductos;
        await prueba.getAll();
        let rsdo = false;
        if (prueba.productos.length > 0) {rsdo = true}
        strictEqual(rsdo, true);
    });

    it('La Consulta por esta categotia, Deberia Tarer al Menos Un Producto.', async () => {
        const prueba = new TestProductos;
        await prueba.getByCat('cotillon');
        let rsdo = false;
        if (prueba.productos.length > 0) {rsdo = true}
        strictEqual(rsdo, true);
    });    
});