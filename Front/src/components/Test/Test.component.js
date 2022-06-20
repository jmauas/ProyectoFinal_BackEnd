import 'dotenv/config';
import React, { useEffect, useState, useContext } from "react";
import { pedirProductosTest } from '../../modelos/productos.models.js'
import { Item } from './Test-item.component.js';
import { UserAuthContext } from "../../context/LoginContext";


export const TablaTest = () => {
    const [loading, setLoading] = useState([]);
    const [items, setItems] = useState(null);
    const {setIsAuthenticated} = useContext(UserAuthContext);
    
    useEffect(() => {
        setLoading(true);
        pedirProductosTest(res => {           
            setLoading(false);
            if (res === 401){
                setIsAuthenticated(true);
                setIsAuthenticated(false);
            } else {
                setItems(res);
            }
        })     
    }, [setIsAuthenticated, setLoading])
    return (
        <div className="container mx-5">
            <h4>Detalle de Testeo Back de Productos Aleatorios</h4>
            <table className="table table-striped table-success">
                <thead key="1">
                    <tr key="tablaTest">
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody key="2">
                    {items
                     ? items.map(item => <Item {...item} key={item.id}/>)
                     : <tr key="tablaTest2"><td colSpan="4"><h2>Sin Productos en Esta Categoria / Busqueda ....</h2></td></tr>
                    }
                </tbody>
            </table>
        </div>          
    )
}
