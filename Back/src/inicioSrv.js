import 'dotenv/config';
import Server from './server.js';
import minimist from 'minimist';
import logger from './utils/logger.js';


const options = {
    default: {
       port: 8080
    }
}
const arg = minimist(process.argv.slice(2), options);
const PORT = arg.port || 8080;
(async () => {
  try {
    const server = new Server(PORT)
    await server.start()
    await server.listen()
  } catch (error) {
    logger.error(`error ${error}`)
  }
})();