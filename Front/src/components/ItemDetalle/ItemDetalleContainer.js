import React, {useEffect, useState, useContext} from "react";
import './ItemDetalleContainer.css';
import { pedirProducto } from '../../modelos/productos.models.js';
import { UserAuthContext } from "../../context/LoginContext";


import { ItemDetalle } from "./ItemDetalle.component";
import { useParams, Redirect } from 'react-router-dom';
import { Loader } from "../Loader/Loader.component";
import Swal from "sweetalert2";

export const ItemDetalleContainer = () => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState([]);
    const {itemId} = useParams();
    const {setIsAuthenticated} = useContext(UserAuthContext);

    const noExiste = () => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Este Producto No Existe',
            showConfirmButton: false,
            timer: 2500
        })
    }

    useEffect(() => {
        setLoading(true);
         pedirProducto(itemId, (res) => {
            if (res === 401){
                setIsAuthenticated(true);
                setIsAuthenticated(false);
            } else {
                setItem(res);
                setLoading(false);
            }            
         })            
    }, [itemId, setIsAuthenticated])

    return (
        <>
            {
                loading 
                ? <Loader />
                : <>
                    { 
                        item.nombre===undefined
                        ? <>
                            {noExiste()}
                            <Redirect to="/"/>;                   
                          </>
                        : <>
                            <ItemDetalle {...item}/>    
                          </>
                    }
                  </>
            }
        </>
    );
}
