import Productos from '../services/DAO/productos.service.js';
import logger from '../utils/logger.js';

let prod = Productos.initInstancia();

export const getProds = async (req, res) => {
    logger.info(`Get Productos/`);
    prod.getAll(p => {
        res.status(200).json(p);
    });
}

export const getProd = async (req, res) => {
    const id = req.params.id;
    logger.info(`Get Producto ID/${id}`);
    prod.getById(id, p => {
        if(p===null){
            res.status(400).json({error: 'Producto No Encontrado.'})
        } else {
            res.status(200).json(p);
        }
    });       
};

export const getProdCat = async (req, res) => {
    const { ...rest } = req.params;
    const cat = rest.cat;
    logger.info(`Get Productos/categoria/${cat}`);
    prod.getByCat(cat, p => {
        res.status(200).json(p);
    });
};

export const nuevoProd = async (req, res) => {
    let admin = req.query.admin;
    logger.info(`Post Productos/ ${admin}`);
    if (admin!=true) {
        res.status(400).json({error: 400, descripción: 'Ruta Productos Mètodo Post NO Autorizado'});
    } else {
        try {            
            const { categ, descrip, nombre, img, precio, sku, stock } = req.body;
            const productoNuevo = {
                categ,
                descrip,
                nombre,
                img,
                precio, 
                sku, 
                stock
            }
            logger.info(`Post Productos/ Producto: ${JSON.stringify(productoNuevo)} - 
                                         ID: ${prod}`);
            prod.save(productoNuevo, prod => {
                res.status(200).json(prod);
            });
        } catch (err) {
            logger.error(`Post Productos - Error: ${err}`);
            res.status(400).json({error: err});
        }
    }
};

export const modiProd = async (req, res) => {
    let admin = req.query.admin;
    logger.info(`Put Productos/ ${admin}`);
    if (admin!=true) {
        res.status(400).json({error: 400, descripción: 'Ruta Productos Mètodo Put NO Autorizado'});
    } else {
        try {
            const productoNuevo = req.body;
            logger.info(`Put Productos/ Producto: ${JSON.stringify(productoNuevo)} - 
                                        ID: ${prod}`);
            prod.modi(productoNuevo, prod => {
                res.status(200).json(prod);
            });
        } catch (err) {
            res.status(400).json({error: err});
        } 
    }
};

export const borrarProd = async (req, res) => {
    let admin = req.query.admin;
    logger.info(`Delete Productos/ ${admin}`);
    if (admin!=true) {
        res.status(400).json({error: 400, descripción: 'Ruta Productos Mètodo Delete NO Autorizado'});
    } else {
        try {
            const { ...rest } = req.params;
            const id = Number(rest.id);
            logger.info(`Delete Productos/ ID: ${id}`);
            prod.deleteById(id, prod => {
                res.status(200).json(prod);
            });
        } catch (err) {
            logger.error(`Delete Productos - Error: ${err}`);
            res.status(400).json({error: err});
        }
    }
};