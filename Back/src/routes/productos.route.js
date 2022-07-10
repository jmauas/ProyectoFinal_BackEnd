import express  from 'express';
import auth from '../middle/auth.middle.js';
import * as prodController from '../controllers/productos.controllers.js';

const router = express.Router();

// router.get("/", auth, prodController.getProds);
router.get("/", prodController.getProds);

router.get("/:sku", prodController.getProd);
// router.get("/:sku", auth, prodController.getProd);

router.get("/categoria/:cat", prodController.getProdCat);
// router.get("/categoria/:cat", auth, prodController.getProdCat);

router.post("/", prodController.nuevoProd);
// router.post("/", auth, prodController.nuevoProd);

router.put("/:sku", prodController.modiProd);
// router.put("/:sku", auth, prodController.modiProd);

router.delete("/:sku", prodController.borrarProd);
// router.delete("/:sku", auth, prodController.borrarProd);

export default router;