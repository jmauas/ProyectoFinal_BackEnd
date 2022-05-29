import { Strategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { UsuariosModel } from "../models/usuarios.model.js";

passport.use(
    "signup",
    new Strategy(
        {
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                const userExists = await UsuariosModel.findOne({username: username });
                if (userExists) {
                    console.log("Usuario existe");
                    return done(null, false);
                }
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
                    updated_at: usuario.updated_at,
                    password: bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10), null),
                };
                newUser.created_at = new Date()
                const user = await UsuariosModel.create(newUser);
                return done(null, user);
            } catch (error) {
                console.log('Error ', error);
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
                console.log("Usuario no encontrado!");
                return done(null, false);
            }
            const isValid = bcrypt.compareSync(password, user.password);
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            console.log(error);
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