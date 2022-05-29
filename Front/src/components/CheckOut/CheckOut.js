import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import { CarritoContext } from '../../context/CarritoContext';
import { generarOrden } from '../../controlers/carrito';
import { FormUsuario } from '../FormUsuario/FormUsuario';
import Swal from 'sweetalert2';
import { BusquedaContext } from "../../context/BusquedaContext";
import { ControlForm } from "../FormUsuario/ControlForm";
import './CheckOut.css';


export const CheckOut = () => {

    const {carrito, calcularTotal, calcularCantidad, vaciarCarrito} = useContext(CarritoContext)
    const [loading, setLoading] = useState(false);
    const {usuario} = useContext(BusquedaContext);
    
    const enviarOrden = async () => {  
        if (ControlForm(usuario)===false) return;
        setLoading(true);
        generarOrden(usuario, carrito, calcularTotal(), calcularCantidad())
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Su Compra Fué registrada',
                    text: `Guarde su Nro. de Órden: ${res}`,
                    willClose: () => {
                        vaciarCarrito(false);
                    }
                })            
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Se Produjo Un Error',
                    text: `Ya No queda mas Stock de: ${err.map(el => el.nombre).join(', ')}. Por Favor, Re arme su Carrito, y Disculpe las Molestias.`
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            {carrito.length === 0 && <Redirect to="/"/>}
            <div>
                <hr/>
                <h2 className="tituloFormulario">Ingresá tus Datos</h2>
                <FormUsuario  enviar={enviarOrden} loading={loading}/>                
                <hr/>
            </div>
        </>
    )
}