import UsuariosMongo from './mongo/usuarios.mongo.service.js'
import UsuariosSqlite from './SQLite/usuarios.sql.service.js'
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const { db } = argv || 'sqlite';

let Instancia;
switch (db) {
    case 'sqlite':
        Instancia = new UsuariosSqlite();  
    break;
    case 'mongo':
        Instancia = new UsuariosMongo();
        break;
}

export default class InstanciaFactory {
  static initInstancia() {
    return Instancia;
  }
}