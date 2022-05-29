import React, { useState, useContext} from 'react'
import { FormUsuario } from '../FormUsuario/FormUsuario.component';
import { UserAuthContext } from "../../context/LoginContext";
import Swal from 'sweetalert2';
import { nuevoUsuario } from '../../modelos/usuarios.models'
import { BusquedaContext } from "../../context/BusquedaContext";
import { ControlForm } from "../FormUsuario/ControlForm";
import '../CheckOut/CheckOut.css';
import { useHistory } from 'react-router'

export const Registrarse = () => {
    const [loading, setLoading] = useState(false);
    const {usuario} = useContext(BusquedaContext)
    const {setIsAuthenticated} = useContext(UserAuthContext);
    const history = useHistory();

    const enviarRegistro = async () => {  
        if (ControlForm(usuario)===false) return;
        setLoading(true);
        nuevoUsuario(usuario, us => {
            setIsAuthenticated(true);
            Swal.fire({
                icon: 'success',
                title: 'Usuario Registrado',
            })
            history.push('/');
            setLoading(false);
        })
    }

    return (
        <div>
            <h2 className="tituloFormulario">Ingresá tus Datos</h2>
            <FormUsuario  enviar={enviarRegistro} loading={loading}/>              
        </div>
    )
}
