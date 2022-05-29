import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 1000
    },
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
        max: 99999999999
    },
    tel: {
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
    },
    password: {
        type: String,
        required: true,
        max: 10000
    }
});

export const UsuariosModel = mongoose.model('usuarios', Schema)