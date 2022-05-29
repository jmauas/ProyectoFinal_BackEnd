import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        max: 1000
    },
    descrip: {
        type: String,
        required: true,
        max: 1000
    },
    categ: {
        type: String,
        required: true,
        max: 100
    },
    img: {
        type: String,
        max: 100
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sku: {
        type: String,
        required: true,
        max: 100
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date
    }
});

export const ProductosModel = mongoose.model('Productos', Schema)