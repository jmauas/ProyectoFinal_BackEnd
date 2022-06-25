import express  from 'express';
import * as infoController from '../controllers/info.controller.js';
const router = express.Router();

router.get("/", infoController.getInfo);

export default router