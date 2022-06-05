import express  from 'express';
import { fork } from "child_process";
import logger from '../utils/logger.js';

const router = express.Router();
let computo = fork(`./src/utils/calculo.util.js`);

router.get("/", (req, res) => {
    const {cant=100000000} = req.query;
    logger.info(`Get Randoms/ ${cant}`);
    computo.on("message", (rsdo) => {
        logger.info(rsdo)
        res.status(200).send({ rsdo });
        computo.kill();
        computo = fork(`./src/utils/calculo.util.js`);
    });
    computo.send(cant);
});

export default router