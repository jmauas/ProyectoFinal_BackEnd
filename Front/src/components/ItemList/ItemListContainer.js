import React, {useEffect, useState, useContext} from "react";
import { BusquedaContext } from "../../context/BusquedaContext";
import './ItemListContainer.css';
import { pedirProductos } from '../../modelos/productos.models.js'

import { ItemsList } from "./itemsList.component";
import { useParams } from 'react-router-dom';
import { Loader } from "../Loader/Loader.component";
import { UserAuthContext } from "../../context/LoginContext";


export const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState([]);
    const {busqueda, setBusqueda} = useContext(BusquedaContext);
    const {setIsAuthenticated} = useContext(UserAuthContext);
    let {category} = useParams();

    if (category===undefined) category='';
    if (busqueda===undefined) setBusqueda('');
    
    useEffect(() => {
        setLoading(true);
        pedirProductos(category, (res) => {
            setLoading(false);
            if (res === 401){
                setIsAuthenticated(true);
                setIsAuthenticated(false);
            } else {
                let filtrado = [];    
                if (busqueda !== '') {
                    for (let i of res) {
                        if (i.nombre.toString().toLowerCase().indexOf(busqueda.toLowerCase()) >=0) {
                            filtrado.push(i);
                        }
                    }
                } else {
                    filtrado = res;
                }
                setItems( filtrado ); 
                setLoading(false);
            }
         });
    }, [category, busqueda, setIsAuthenticated])
    return (
        <>
            <div className="container-fluid" id="listContainer">
                <div className="row align-items-center">
                        {(loading) 
                            ? <Loader />
                            : <>                                
                                <ItemsList productos={items}/>    
                            </>
                        }
                </div>
            </div>
        </>
    );
}
