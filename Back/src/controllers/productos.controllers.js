import Productos from '../services/DAO/productos.service.js';
import logger from '../utils/logger.js';
import ProductosDTO from '../services/DTO/productos.DTO.js';

let prod = Productos.initInstancia();

export const getProds = async (req, res) => {
    logger.info(`Get Productos/`);
    let prods = await prod.getAll();
    prods = prods.map((p) => ProductosDTO(p));
    res.status(200).json(prods);   
}

export const getProd = async (req, res) => {
    const sku = req.params.sku;
    logger.info(`Get Producto ID/${sku}`);
    const produc = await prod.getById(sku);
    if(produc===null){
        res.status(400).json({error: 'Producto No Encontrado.'})
    } else {
        res.status(200).json(ProductosDTO(produc));
    }    
};

export const getProdCat = async (req, res) => {
    const { ...rest } = req.params;
    const cat = rest.cat;
    logger.info(`Get Productos/categoria/${cat}`);
    const produc = await prod.getByCat(cat)
    const prods = produc.map((p) => ProductosDTO(p));
    res.status(200).json(prods);
};

export const nuevoProd = async (req, res) => {
    logger.info(`Post Productos/`);    
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
        const produc = await  prod.save(productoNuevo);
        res.status(200).json(ProductosDTO(produc));
    } catch (err) {
        logger.error(`Post Productos - Error: ${err}`);
        res.status(400).json({error: err});
    }
};

export const modiProd = async (req, res) => {       
    try {
        const productoNuevo = req.body;
        logger.info(`Put Productos/ Producto: ${JSON.stringify(productoNuevo)} - 
                                    ID: ${prod}`);
        const produc = await prod.modi(productoNuevo)
        res.status(200).json(ProductosDTO(produc));
    } catch (err) {
        res.status(400).json({error: err});
    } 
};

export const borrarProd = async (req, res) => {
    try {
        const sku = req.params.sku;
        logger.info(`Delete Productos/ ID: ${sku}`);
        const produc = await prod.deleteById(sku);
        res.status(200).json({});
    } catch (err) {
        logger.error(`Delete Productos - Error: ${err}`);
        res.status(400).json({error: err});
    }
}