import React, {useContext} from 'react'
import './ItemListContainer.css';
import {Card, Button} from 'react-bootstrap'
import { FaPlus} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FormatosContext } from '../../context/FormatosContext';

export const Item = ( {_id, nombre, precio, img, categ, sku} ) => {
    const {formatoSepMiles} = useContext(FormatosContext);

    return (
        <div className="col col-xs-12 col-s-6 col-md-4 col-l-3 col-xl-2.5">
            <Card className="item-card">
                <Link to={`/producto/${sku}`}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL + img} className="fotoList" alt={nombre}/>
                </Link>
                <Card.Body>
                    <Card.Title className="tituloList">{nombre}</Card.Title>
                    <Card.Title className="precioList">Precio: $ {formatoSepMiles(precio, 2)}-</Card.Title>
                    <Link to={`/producto/${sku}`}>
                        <Button variant="secondary" className="botonCarro"><FaPlus color="#FF305D" size="25px"/> Ver Detalle</Button>
                    </Link>
                    <Card.Text>CATEG. {categ} SKU: {sku}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}