import express  from 'express';
import upload from "../utils/uploadFile.js";
import * as Subir from '../controllers/subir.controller.js';

const routerSubir = express.Router();

routerSubir.post("/", upload.single("myFile"), Subir.subir);

routerSubir.get("/:file", Subir.getFile);

export default routerSubir;