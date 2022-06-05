import express  from 'express';
import Carrito from '../controlers/carrito.controler.js';
import auth from '../middle/auth.middle.js';
import logger from '../utils/logger.js';

const router = express.Router();
const carrito = new Carrito();

router.get("/:id", auth, (req, res) => {
    const { ...rest } = req.params;
    const id = rest.id;
    logger.info(`Get Carrito/${id}`);
    carrito.getById(id, p => {
        if(p===undefined){
            logger.warn('Carrito NO Enocntrado');
            res.status(400).json({error: 'Carrito No Encontrado.'})
        } else {
            res.status(200).json(p);
        }
    });       
});

router.get("/usuario/:email", auth, (req, res) => {
    const { ...rest } = req.params;
    const email = rest.email;
    logger.info(`Get Carrito/usuario/${email}`);
    carrito.geByUs(email, ordenes => {
        res.status(200).json(ordenes);
    });
});

router.post("/", auth, (req, res) => {
    try {
        const { datos, carrito, total, cantTotal } = req.body;
        logger.info(`Post Carrito/Datos: ${JSON.stringify(datos)}
                         - Carrito: ${JSON.stringify(carrito)}
                         - Total: ${JSON.stringify(total)} 
                         - CantTotal: ${JSON.stringify(cantTotal)}`);
        carrito.generarOrden(datos, carrito, total, cantTotal, carrito => {
            res.status(200).json(carrito);
        });
    } catch (err) {
        logger.error(`Post Carrito - Error: ${err}`);
        res.status(400).json({error: err});
    }
});

router.put("/:id", auth, (req, res) => {
    try {
        const carritoNuevo = req.body;
        const { ...rest } = req.params;
        logger.info(`Put Carrito/ ID: ${rest.id}
        - Carrito: ${JSON.stringify(carritoNuevo)}`);
        carrito.modi(carritoNuevo, c => {
            res.status(200).json(c);
        });
    } catch (err) {
        logger.error(`Put Carrito - Error: ${err}`);
        res.status(400).json({error: err});
    } 
});

router.delete("/:id", auth, (req, res) => {
    try {
        const { ...rest } = req.params;
        const id = rest.id;
        logger.info(`Delete Carrito/ID ${id}`);
        carrito.deleteById(id, c => {
            res.status(200).json(c);
        });
    } catch (err) {
        logger.error(`Delete Carrito - Error: ${err}`);
        res.status(400).json({error: err});
    }
});

export default router;