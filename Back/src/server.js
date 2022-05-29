
import routerProd from "./routes/productos.route.js";
import routerProdTest from "./routes/productosTest.route.js";
import routerCarrito from "./routes/carrito.route.js";
import routerUsuarios from "./routes/usuario.route.js";
import routerInfo from "./routes/info.route.js";
import routerRandoms from "./routes/randoms.route.js";
import express  from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketSrv } from 'socket.io';
import Mensajes from "./controlers/mensajes.controler.js";
import session from 'express-session';
import mongoStore from 'connect-mongo';
import 'dotenv/config';
import passport from "./utils/passport.util.js";

class Server {
   constructor (port) {
      this.port = port;
      this.app = express();
      this.server = http.createServer(this.app);
      this.io = new SocketSrv(this.server, {
         cors: { origin: '*'}
      });
      this.msgsClass = new Mensajes();
      this.msgs = [];
   }
   async listen() {
      this.server = http.createServer(this.app);
      this.server.listen(this.port, () => {
         console.log(`Servidor Escuchando Y Listo en http://localhost:${this.port}`)
      });
   }
   async start() {
      this.app.use(cors({
         origin: 'http://localhost:3000',
         methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
         credentials: true,
      }));

      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(session({
         store: mongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            options: {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
            },
         }),    
         secret: process.env.SECRET,
         resave: true,
         saveUninitialized: true,
         cookie: {
            httpOnly: true,
            maxAge: Number(process.env.EXPIRE),
            sameSite: false
         },
         rolling: true
      }));
      this.app.use(passport.initialize());
      this.app.use(passport.session());
      this.app.use("/api/productos", routerProd);     
      this.app.use("/api/productos-test", routerProdTest);     
      this.app.use("/api/carrito", routerCarrito);
      this.app.use("/api/usuario", routerUsuarios);
      this.app.use("/api/info", routerInfo);
      this.app.use("/api/randoms", routerRandoms);
      this.app.get('*', (req, res) => {
         res.status(400).json({descripcion: `Ruta ${req.originalUrl} Inexistente.`});
      });

      this.io.on('connection', async (socket) => {
         console.log('Usuario Conectado');
         socket.emit('Bienvenida', {
            msg: '👍 Estamos en Línea para escucharte. 😎 '              
         });
         msgs = await msgsClass.Mostrar();
         io.sockets.emit('mensajeBack', msgs)
         
         socket.on('disconnect', () => {
               console.log('Usuario Desconectado');
               socket.emit('Bienvenida', '😇 Nos Vemos la Próxima. 😎 ' );
         });
         
         socket.on('notificacion', (data) => {
               console.log(`Recibido: ${data}`);
         })

         socket.on('mensajeFront', async (data) => {
            msgsClass.guardarYMostrar(socket.id, data, (msgs) => {
               io.sockets.emit('mensajeBack', msgs);
            });
         })
      })
   }
}

export default Server;
