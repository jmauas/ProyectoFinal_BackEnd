import express  from 'express';
import auth from '../middle/auth.middle.js';
import { getProd } from '../controllers/productosTest.controller.js';

const router = express.Router();

router.get("/", auth, getProd);

export default router;