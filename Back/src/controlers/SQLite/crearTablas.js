import { config } from "./configSqLite.js";
import knex1 from 'knex';
const knex = knex1(config);

(async () => {
    try {
        await knex.schema.dropTableIfExists('mensajes');

        await knex.schema.createTable('mensajes', (table) => {
            table.increments();
            table.string('socketId');
            table.string('us');
            table.string('mail');
            table.string('mensaje');
            table.datetime('fh');
        })
        console.log('TABLAS CREADAS CON ÉXITO.')
    } catch (error) {
        console.log(error);
    } finally {
        knex.destroy();
    }
})();