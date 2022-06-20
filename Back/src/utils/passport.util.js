import { Strategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { UsuariosModel } from "../models/usuarios.model.js";
import logger from './logger.js';
import { mailNuevoUsuario } from '../controlers/notificacion.controler.js';

passport.use(
    "signup",
    new Strategy(
        {
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                const userExists = await UsuariosModel.findOne({username: username });
                const usuario = req.body
                const newUser = {
                    username: usuario.username,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    domicilio: usuario.domicilio,
                    localidad: usuario.localidad,
                    provincia: usuario.provincia,
                    email: usuario.email,
                    dni: usuario.dni,
                    tel: usuario.tel,
                    codPais: usuario.codPais,
                    img: usuario.img,
                    updated_at: usuario.updated_at,
                    password: bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10), null),
                };
                if (userExists) {
                    newUser.updated_at = new Date()
                    const user = await UsuariosModel.findOneAndUpdate({username: usuario.username}, newUser);
                    return done(null, user);
                } else {
                    newUser.created_at = new Date();
                    const user = await UsuariosModel.create(newUser);
                    const fecha = new Date()
                    mailNuevoUsuario(user)
                    return done(null, user);
                }
            } catch (error) {
                logger.info('Error ', error);
            }
        }
    )
);

passport.use(
    "login",
    new Strategy(async (username, password, done) => {
        try {
            const user = await UsuariosModel.findOne({username: username });
            if (!user) {
                logger.info("Usuario no encontrado!");
                return done(null, false);
            }
            const isValid = bcrypt.compareSync(password, user.password);
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            logger.info(error);
            return done(null, error);
        }
    })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UsuariosModel.findById(id, done);
});

export default passport;