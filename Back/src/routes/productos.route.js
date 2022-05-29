import express  from 'express';
import Productos from '../controlers/productos.controler.js';
import auth from '../middle/auth.middle.js';

const router = express.Router();
const prod = new Productos();

router.get("/", auth, (req, res) => {
    prod.getAll(p => {
        res.status(200).json(p);
    });
});

router.get("/:id", auth, (req, res) => {
    const { ...rest } = req.params;
    const id = rest.id;
    prod.getById(id, p => {
        if(p===null){
            res.status(400).json({error: 'Producto No Encontrado.'})
        } else {
            res.status(200).json(p);
        }
    });       
});

router.get("/categoria/:cat", auth, (req, res) => {
    const { ...rest } = req.params;
    const cat = rest.cat;
    prod.getByCat(cat, p => {
        res.status(200).json(p);
    });
});

router.post("/", auth, (req, res) => {
    let admin = req.query.admin;
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
            prod.save(productoNuevo, prod => {
                res.status(200).json(prod);
            });
        } catch (err) {
            res.status(400).json({error: err});
        }
    }
});

router.put("/:id", auth, (req, res) => {
    let admin = req.query.admin;
    if (admin!=true) {
        res.status(400).json({error: 400, descripción: 'Ruta Productos Mètodo Put NO Autorizado'});
    } else {
        try {
            const productoNuevo = req.body;
            console.log(productoNuevo);
            prod.modi(productoNuevo, prod => {
                res.status(200).json(prod);
            });
        } catch (err) {
            res.status(400).json({error: err});
        } 
    }
});

router.delete("/:id", auth, (req, res) => {
    let admin = req.query.admin;
    if (admin!=true) {
        res.status(400).json({error: 400, descripción: 'Ruta Productos Mètodo Delete NO Autorizado'});
    } else {
        try {
            const { ...rest } = req.params;
            const id = Number(rest.id);
            prod.deleteById(id, prod => {
                res.status(200).json(prod);
            });
        } catch (err) {
            res.status(400).json({error: err});
        }
    }
});

export default router;