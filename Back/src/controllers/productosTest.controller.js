import Productos from '../services/productosTest.service.js';
import logger from '../utils/logger.js';

const prod = new Productos();

export const getProd = async (req, res) => {
    logger.info(`Get ProductosTest/`);
    prod.getAll(p => {
        res.status(200).json(p);
    });
};