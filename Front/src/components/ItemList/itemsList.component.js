import React from "react";
import { Item } from './Item.component'

export const ItemsList = ({productos = []}) => {
    return  (
        <>
            {productos.length>0 
                ? productos.map((item) => <Item {...item} key={item._id}/>) 
                : <h2>Sin Productos en Esta Categoria / Busqueda ....</h2>}
        </>
    )
}