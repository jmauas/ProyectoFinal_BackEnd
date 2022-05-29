import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import { CarritoContext } from '../../context/CarritoContext';
import { nuevaOrden } from '../../modelos/ordenes.models';
import { FormUsuario } from '../FormUsuario/FormUsuario.component';
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
        nuevaOrden(usuario, carrito, calcularTotal(), calcularCantidad(), orden => {
            Swal.fire({
                icon: 'success',
                title: 'Su Compra Fué registrada',
                text: `Guarde su Nro. de Órden: ${orden.id}`,
                willClose: () => {
                    vaciarCarrito(false);
                }
            })
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