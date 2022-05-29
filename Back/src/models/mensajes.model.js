import mongoose from 'mongoose';

const SchemaMensaje = new mongoose.Schema({
    author: {
        id: {
            type: String,
            required: true,
            max: 1000
        },
        socketId: {
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
        edad: {
            type: Number,
            required: true,
            max: 120
        },
        alias: {
            type: String,
            required: true,
            max: 1000
        },
        avatar: {
            type: String,
            max: 100000
        },
        fh: {
            type: Date
        }
    },
    text: {
        type: String,
        required: true,
        max: 99999999
    }
});

export const MensajesModel = mongoose.model('Mensajes', SchemaMensaje);