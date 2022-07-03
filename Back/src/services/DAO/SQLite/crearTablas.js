import { config } from "./configSqLite.js";
import knex1 from 'knex';
import logger from '../../../utils/logger.js';
import { productos } from  '../mongo/crearDocumentos.js'

const knex = knex1(config);

(async () => {
    //try {
        await knex.schema.dropTableIfExists('mensajes');
        await knex.schema.createTable('mensajes', (table) => {
            table.increments();
            table.string('socketId');
            table.string('mail');
            table.string('mensaje');
            table.string('nombre');
            table.string('apellido');
            table.string('edad');
            table.string('alias');
            table.string('avatar');
            table.datetime('fh');
        })

        await knex.schema.dropTableIfExists('ordenes');
        await knex.schema.createTable('ordenes', (table) => {
            table.increments();
            table.string('nombre');
            table.string('apellido');
            table.string('domicilio');
            table.string('localidad');
            table.string('provincia');
            table.string('email');
            table.string('username');
            table.string('dni');
            table.string('tel');
            table.double('cantTotal');
            table.double('total');
            table.datetime('fh');
        })

        await knex.schema.dropTableIfExists('ordenes_items');
        await knex.schema.createTable('ordenes_items', (table) => {
            table.increments();
            table.string('nombre');
            table.string('categ');
            table.string('descrip');
            table.string('img');
            table.string('sku');
            table.double('precio');
            table.double('stock');
            table.double('cantidad');
            table.string('idOPrden');
            table.double('total');
        })

        await knex.schema.dropTableIfExists('productos');
        await knex.schema.createTable('productos', (table) => {
            table.increments();
            table.string('nombre');
            table.string('categ');
            table.string('descrip');
            table.string('img');
            table.string('sku');
            table.double('precio');
            table.double('stock');
            table.datetime('created_at');
            table.datetime('updated_at');
        })

        productos.map(async (producto) => {
            producto.created_at = new Date();
            await knex('productos').returning('id')
                                .insert(producto);
        });

        await knex.schema.dropTableIfExists('usuarios');
        await knex.schema.createTable('usuarios', (table) => {
            table.increments();
            table.string('username');
            table.string('nombre');
            table.string('apellido');
            table.string('domicilio');
            table.string('localidad');
            table.string('provincia');
            table.string('email');
            table.string('dni');
            table.string('tel');
            table.string('codPais');
            table.string('created_at');
            table.string('updated_at');
            table.string('password');
            table.string('img');
        })

        logger.info('TABLAS CREADAS CON ÉXITO.')
    // } catch (error) {
    //     logger.error(error);
    // } finally {
    //     knex.destroy();
    // }
})();