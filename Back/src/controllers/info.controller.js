import minimist from 'minimist';
import logger  from '../utils/logger.js';

import os from 'os';
const numCPUs = os.cpus().length;

export const getInfo = (req, res) => {
    const arg = minimist(process.argv.slice(2));
    let html = `<h1>INFORMACIÓN DE SESIÓN</h1><ul>`;
    html += `<li>Argumentos de Entrada: ${JSON.stringify(arg)}</li>`; 
    html += `<li>Path: ${process.cwd()}</li>`;
    html += `<li>Sistema Operativo: ${process.platform}</li>`;
    html += `<li>ID Proceso: ${process.pid}</li>`;
    html += `<li>Versión Node: ${process.version}</li>`;
    html += `<li>Carpeta Proyecto: ${process.execPath}</li>`;
    html += `<li>Memoria Total Reservada (RSS): ${process.memoryUsage().rss}</li>`;
    html += `<li>Número de Procesadores del Servidor: ${numCPUs}</li>`;

    logger.info(`Get Info/ ${html}`);
    res.status(200).send(html);         
}