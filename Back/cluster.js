import cluster from 'cluster';
import os from 'os';
const numCPUs = os.cpus().length;
import 'dotenv/config';
import Server from './src/server.js';
import logger from './src/utils/logger.js';

if (cluster.isMaster) {
    logger.info(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      logger.info(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    const PORT = parseInt(process.argv[2]) || 8080;
    try {
        const server = new Server(PORT)
        await server.start()
        await server.listen()
    } catch (error) {
        logger.error(`error ${error}`)
    }
}