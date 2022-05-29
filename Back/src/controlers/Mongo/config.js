import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()

mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
        console.log('Error al Conectarse a MongoDB');
    } else {
        console.log('Conectados a MongoDB')
    }});

export default mongoose;