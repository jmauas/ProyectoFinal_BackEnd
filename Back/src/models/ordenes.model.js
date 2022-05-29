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
    dni: {
        type: Number,
        required: true,
        max: 99999999
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
    fh: {
        type: Date,
        required: true
    },
    total: {
        type: Number,
        required: true,
        max: 9999999999
    }
});

const SchemaOrdenes_items = new mongoose.Schema({
    idProducto: {
        type: Number,
        required: true
    },
    nombre: {
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
    cant: {
        type: Number,
        required: true,
        max: 99999
    },
    idOrden: {
        type: Date,
        required: true
    },
    total: {
        type: String,
        required: true,
        max: 10000
    }
});

export const OrdenesModel = mongoose.model('Ordenes', SchemaOrdenes);
export const OrdenesModel_Items = mongoose.model('Ordenes_Items', SchemaOrdenes_items);