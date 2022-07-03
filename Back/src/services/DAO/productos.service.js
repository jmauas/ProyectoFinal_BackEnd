
import ProductosMongo from './mongo/productos.mongo.service.js'
import ProductosSqlite from './SQLite/productos.sql.service.js'
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const { db } = argv || 'sqlite';

let Instancia;
switch (db) {
    case 'sqlite':
        Instancia = new ProductosSqlite();  
    break;
    case 'mongo':
        Instancia = new ProductosMongo();
        break;
}

export default class InstanciaFactory {
  static initInstancia() {
    return Instancia;
  }
}
