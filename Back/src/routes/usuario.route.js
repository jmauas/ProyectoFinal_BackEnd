import express  from 'express';
import Usuarios from '../controlers/usuarios.controler.js';
import auth from '../middle/auth.middle.js';
import passport from "../utils/passport.util.js";
import * as AuthController from "../controlers/auth.controler.js";
import logger from '../utils/logger.js';

const router = express.Router();
const usuarios = new Usuarios();

//  router.get("/:id", auth, async (req, res) => {
//      const { ...rest } = req.params;
//      const id = rest.id;
//     logger.info(`Get Usuario/${id}`);
//      await usuarios.getById(id, u => {
//          if(u===undefined){
//              logger.error('Usuario NO Enocntrado');
//              res.status(400).json({error: 'usuario No Encontrado.'})
//          } else {
//              res.status(200).json(u);
//          }
//      });       
//  });

router.post("/login",
    passport.authenticate("login", { failureRedirect: "/api/usuario/failLogin" }),
    AuthController.postLogin,
);
router.get("/failLogin", AuthController.failLogin);

router.post("/",
    passport.authenticate("signup", { failureRedirect: "/api/usuario/failSignup" }),
    AuthController.postSignup,
);

router.get("/failSignup", AuthController.failSignup);

router.get("/logout", AuthController.logout);

router.put("/:id", auth, async (req, res) => {
    try {
        const usuarioN = req.body;
        await usuarios.modiUsuario(usuarioN, u => {
            res.status(200).json(u);
        });
    } catch (err) {
        logger.error(`Put Usuario - Error: ${err}`);
        res.status(400).json({error: err});
    } 
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const { ...rest } = req.params;
        const id = rest.id;
        logger.info(`Delete Usuario/${id}`);
        await usuarios.deleteById(id, c => {
            res.status(200).json(c);
        });
    } catch (err) {
        logger.error(`Delete Usuario - Error: ${err}`);
        res.status(400).json({error: err});
    }
});

export default router;