import { buildSchema } from 'graphql';


const schema = buildSchema(`
    type Producto {
        id: ID
        nombre: String
        descrip: String
        categ: String
        img: String
        precio: Int
        stock: Int
        sku: String
        created_at: String
        updated_at: String
    }
    type Mensaje {
        id: String
        socketId: String
        nombre: String
        apellido: String
        edad: Int
        alias: String
        avatar: String
        fh: String
        text: String
    }
    type Usuario {
        username: String
        nombre: String
        apellido: String
        domicilio: String
        localidad: String
        provincia: String
        email: String
        dni: Int
        codPais: String
        tel: String
        created_at: String
        updated_at: String
        password: String
        img: String
    }

    input ProductoInput {
        nombre: String!
        descrip: String
        categ: String!
        img: String
        precio: Int!
        stock: Int!
        sku: String!
    }
    input MensajeInput {
        socketId: String!
        nombre: String!
        apellido: String!
        edad: Int!
        alias: String!
        avatar: String!
        fh: String!
        text: String!
    }
    input UsuarioInput {
        username: String!
        nombre: String!
        apellido: String
        domicilio: String!
        localidad: String!
        provincia: String!
        email: String!
        dni: Int!
        codPais: String!
        tel: String!
        password: String!
        img: String
    }

    input ProductoUpdateInput {
        nombre: String
        descrip: String
        categ: String
        img: String
        precio: Int
        stock: Int
        sku: String
    }
    input MensajeUpdateInput {
        nombre: String
        apellido: String
        edad: Int
        alias: String
        avatar: String
        fh: String
        text: String
    }
    input UsuarioUpdateInput {
        username: String
        nombre: String
        apellido: String
        domicilio: String
        localidad: String
        provincia: String
        email: String
        dni: Int
        codPais: String
        tel: String
        password: String
        img: String
    }

    type Query {
        productos: [Producto]
        producto(sku: String!): Producto
        productoCat(categ: String!): [Producto]
        mensajesGet: [Mensaje]
        usuarioGet(email: String!): Usuario
    }

    type Mutation {
        createProducto(producto: ProductoInput): Producto
        updateProducto(sku: String!, producto: ProductoUpdateInput): Producto
        deleteProducto(sku: String!): String
        createMensaje(mensaje: MensajeInput): Mensaje
        createUsuario(usuario: UsuarioInput): Usuario
        updateUsuario(email: String!, usuario: UsuarioUpdateInput): Usuario
        deleteUsuario(email: String!): String
    }
`);

export default  schema