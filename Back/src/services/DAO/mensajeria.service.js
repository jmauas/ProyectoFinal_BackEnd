
import MensajesMongo from './mongo/mensajeria.mongo.service.js'
import MensajesSqlite from './SQLite/mensajeria.sql.service.js'
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const { db } = argv || 'sqlite';

let Instancia;
switch (db) {
    case 'sqlite':
        Instancia = new MensajesSqlite();  
    break;
    case 'mongo':
        Instancia = new MensajesMongo();
        break;
}

export default class InstanciaFactory {
  static initInstancia() {
    return Instancia;
  }
}
