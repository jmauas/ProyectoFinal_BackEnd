import Swal from "sweetalert2";

const aviso = (nombre) => {
    Swal.fire({
        icon: 'error',
        title: `El Campo ${nombre} tiene datos Inválidos.`,
        text: 'Completalo Correctamente'
    })
}

export const ControlForm = (usuario) => {
          
    if (usuario.nombre.length < 3) {
        aviso('Nombre');
        return false;
    }
    if (usuario.apellido.length < 3) {
        aviso('Apellido');
        return false;
    }
    if (usuario.email.length < 3) {
        aviso('Email');
        return false;
    }
    if (usuario.email.indexOf('@')<0) {
        aviso('Email');
        return false;
    }
    if (usuario.tel.length < 7) {
        aviso('Teléfono');
        return false;
    }
    if (usuario.codPais == '') {
        aviso('Codigo de País');
        return false;
    }
    if (usuario.domicilio.length < 5) {
        aviso('Domicilio');
        return false;
    }
    if (usuario.localidad.length < 3) {
        aviso('Localidad');
        return false;
    }
    if (usuario.provincia.length < 3) {
        aviso('Provincia');
        return false;
    }
    if (usuario.dni.length < 7) {
        aviso('DNI');
        return false;
    }
    return true;
}