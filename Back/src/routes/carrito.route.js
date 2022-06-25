import express  from 'express';
import auth from '../middle/auth.middle.js';
import logger from '../utils/logger.js';
import * as ordenesController from '../controllers/ordenes.controller.js';

const router = express.Router();

router.get("/:id", auth, ordenesController.getOrdenId);

router.get("/usuario/:email", auth, ordenesController.getOrdenUs);

router.post("/", auth, ordenesController.nuevaOrden);

router.put("/:id", auth, ordenesController.modiOrden);

router.delete("/:id", auth, ordenesController.borrarOrden);

export default router;