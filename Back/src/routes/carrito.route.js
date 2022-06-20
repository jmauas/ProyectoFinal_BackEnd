import express  from 'express';
import Orden from '../controlers/carrito.controler.js';
import auth from '../middle/auth.middle.js';
import logger from '../utils/logger.js';

const router = express.Router();
const orden = new Orden();

router.get("/:id", auth, (req, res) => {
    const { ...rest } = req.params;
    const id = rest.id;
    logger.info(`Get Carrito/${id}`);
    orden.getById(id, p => {
        if(p===undefined){
            logger.warn('Carrito NO Enocntrado');
            res.status(400).json({error: 'Carrito No Encontrado.'})
        } else {
            res.status(200).json(p);
        }
    });       
});

router.get("/usuario/:email", auth, (req, res) => {
    const email = req.params.email;
    logger.info(`Get Carrito/usuario/${email}`);
    orden.getByUs(email, ordenes => {
        res.status(200).json(ordenes);
    });
});

router.post("/", auth, (req, res) => {
    try {
        const { carrito, total, cantidad, usuario } = req.body;
        logger.info(`Post Carrito/Usuario: ${JSON.stringify(usuario)}
                         - Carrito: ${JSON.stringify(carrito)}
                         - Total: ${JSON.stringify(total)} 
                         - Cantidad: ${JSON.stringify(cantidad)}`);
        orden.generarOrden(carrito, total, cantidad, usuario, ordenNueva => {
            res.status(200).json(ordenNueva);
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
        orden.modi(carritoNuevo, c => {
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
        orden.deleteById(id, c => {
            res.status(200).json(c);
        });
    } catch (err) {
        logger.error(`Delete Carrito - Error: ${err}`);
        res.status(400).json({error: err});
    }
});

export default router;