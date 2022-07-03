import OrdenesMongo from './mongo/ordenes.mongo.service.js'
import OrdenesSqlite from './SQLite/ordenes.sql.service.js'
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const { db } = argv || 'sqlite';

let Instancia;
switch (db) {
    case 'sqlite':
        Instancia = new OrdenesSqlite();  
    break;
    case 'mongo':
        Instancia = new OrdenesMongo();
        break;
}

export default class InstanciaFactory {
  static initInstancia() {
    return Instancia;
  }
}
