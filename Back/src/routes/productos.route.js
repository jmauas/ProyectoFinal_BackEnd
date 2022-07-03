import express  from 'express';
import auth from '../middle/auth.middle.js';
import * as prodController from '../controllers/productos.controllers.js';

const router = express.Router();

router.get("/", prodController.getProds);

router.get("/:id", auth, prodController.getProd);

router.get("/categoria/:cat", auth, prodController.getProdCat);

router.post("/", auth, prodController.nuevoProd);

router.put("/:id", auth, prodController.modiProd);

router.delete("/:id", auth, prodController.borrarProd);

export default router;