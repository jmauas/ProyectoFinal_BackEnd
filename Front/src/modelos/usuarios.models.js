import * as controladorU from '../\services\/usuarios.service';

export const pedirUsuario = (mail, id, pass, res) => {
    mail 
        ?
            controladorU.getByUs(mail, pass, us => res(us))
        :
            controladorU.getById(id, us => res(us))          
}

export const nuevoUsuario = (usuario, res) => {
    controladorU.nuevoUsuario(usuario, us => res(us))
}

export const logOut = (res) => {
    controladorU.logOut(() => res())
}