import mongoose from 'mongoose';

const SchemaOrdenes = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        max: 1000
    },
    apellido: {
        type: String,
        required: true,
        max: 1000
    },
    domicilio: {
        type: String,
        required: true,
        max: 1000
    },
    localidad: {
        type: String,
        required: true,
        max: 1000
    },
    provincia: {
        type: String,
        required: true,
        max: 1000
    },
    email: {
        type: String,
        required: true,
        max: 100
    },
    username: {
        type: String,
        required: true,
        max: 100
    },
    dni: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true,
        max: 100
    },
    cantTotal: {
        type: Number,
        required: true,
        max: 99999
    },
    total: {
        type: Number,
        required: true,
        max: 9999999999
    },
    fh: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const SchemaOrdenes_items = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        max: 1000
    },
    categ: {
        type: String,
        required: true,
        max: 1000
    },
    descrip: {
        type: String,
        required: true,
        max: 1000
    },
    img: {
        type: String,
        required: true,
        max: 1000
    },
    sku: {
        type: String,
        required: true,
        max: 1000
    },
    precio: {
        type: Number,
        required: true,
        max: 999999999
    },
    stock: {
        type: Number,
        required: true,
        max: 999999999
    },
    cantidad: {
        type: Number,
        required: true,
        max: 99999
    },
    idOrden: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true,
        max: 9999999999
    }
});

export const OrdenesModel = mongoose.model('Ordenes', SchemaOrdenes);
export const OrdenesModel_Items = mongoose.model('Ordenes_Items', SchemaOrdenes_items);