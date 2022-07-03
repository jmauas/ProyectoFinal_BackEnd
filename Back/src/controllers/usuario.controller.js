import Usuarios from '../services/DAO/usuarios.service.js';
import logger from '../utils/logger.js';

const usuarios = Usuarios.initInstancia();

export const modiUsuario = async (req, res) => {
    try {
        const usuarioN = req.body;
        await usuarios.modiUsuario(usuarioN, u => {
            res.status(200).json(u);
        });
    } catch (err) {
        logger.error(`Put Usuario - Error: ${err}`);
        res.status(400).json({error: err});
    } 
};

export const borrarUsuario = async (req, res) => {
    try {
        const { ...rest } = req.params;
        const id = rest.id;
        logger.info(`Delete Usuario/${id}`);
        await usuarios.deleteById(id, c => {
            res.status(200).json(c);
        });
    } catch (err) {
        logger.error(`Delete Usuario - Error: ${err}`);
        res.status(400).json({error: err});
    }
}; 