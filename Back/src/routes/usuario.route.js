import express  from 'express';
import auth from '../middle/auth.middle.js';
import passport from "../utils/passport.util.js";
import * as AuthController from "../\services\/auth.service.js";
import * as usuarioController from '../controllers/usuario.controller.js';

const router = express.Router();

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

router.put("/:id", auth, usuarioController.modiUsuario);

router.delete("/:id", auth, usuarioController.borrarUsuario);

export default router;