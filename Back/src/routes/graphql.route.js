import { graphqlHTTP } from 'express-graphql';
import express  from 'express';
import schema from '../models/graphql/graphql.models.js';
const router = express.Router();
import { producto, productos, productoCat
        , mensajesGet, usuarioGet
        , createProducto, updateProducto, deleteProducto
        , createMensaje, createUsuario, updateUsuario, deleteUsuario} from '../services/graphql.service.js';

router.use("/",
    graphqlHTTP({
      schema,
      rootValue: {
        producto,
        productos,
        productoCat,
        mensajesGet,
        usuarioGet,
        createProducto,
        updateProducto,
        deleteProducto,
        createMensaje,
        createUsuario,
        updateUsuario,
        deleteUsuario,
      },
      graphiql: true,
    }),
  );

export default router;