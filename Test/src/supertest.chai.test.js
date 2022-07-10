import dotenv from 'dotenv';
import { productoNuevo } from './utils/producto.js';
import request from 'supertest';
import { expect } from 'chai';

dotenv.config();

describe('Test de CRUD de Productos con Supertest y Chai', () => {
    it('Deberia Retornar un status 200.', async () => {
        let response = await request(process.env.REACT_APP_SERVER).get('/api/productos');
        console.log('Status Respuesta', response.status)
        expect(response.status).to.equal(200);
    });

    it('Deberia Agregar un Nuevo Producto, y devolverlo', async () => {
        let response = await request(process.env.REACT_APP_SERVER).post('/api/productos').send(productoNuevo);
        console.log('Status Respuesta', response.status);
        console.log('Body Respuesta', response.body);
        expect(response.status).to.equal(200);

        const producto = response.body;
        expect(producto.sku).to.equal(productoNuevo.sku);
        expect(producto.nombre).to.equal(productoNuevo.nombre);
        expect(producto.precio).to.equal(productoNuevo.precio);
        expect(producto.categoria).to.equal(productoNuevo.categoria);
        expect(producto.descripcion).to.equal(productoNuevo.descripcion);
        expect(producto.img).to.equal(productoNuevo.img);
    });    
});