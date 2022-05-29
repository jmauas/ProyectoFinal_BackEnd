import React, {useState, useContext} from 'react'
import './ItemDetalleContainer.css';
import { Alert, Button} from 'react-bootstrap'
import { FaCartPlus as Carro, FaBackspace as Back, FaCashRegister as Pagar, FaPlus, FaMinus } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { CarritoContext } from '../../context/CarritoContext';
import { Link } from 'react-router-dom';
import { FormatosContext } from '../../context/FormatosContext';
import Swal from 'sweetalert2';

export const ItemDetalle = ( {_id, nombre, precio, img, categ, descrip, stock, sku} ) => {
    const {goBack} = useHistory();
    const [excede, setExcede] = useState(false);
    const [cant, setCant] = useState(0);
    const {addToCarrito, estaEnCarrito} = useContext(CarritoContext);
    const {formatoSepMiles} = useContext(FormatosContext);


    const handleMas = () => {
        if ((cant + 1) > stock) {
            setExcede(true);
        } else {
            setCant(cant + 1);
            setExcede(false);
        }
    }
    const handleMenos = () => {
        if (cant - 1 >0)  setCant(cant - 1)
        setExcede(false);
    }

    const handleCant = (e) => {
        if ((e.target.value) > stock) {
            setExcede(true);
            setCant(stock)
        } else if (e.target.value<=0){
            setCant(0);
            setExcede(false);
        } else {
            setCant(e.target.value)
            setExcede(false);
        }
    }

    const agregarCarro = () => {
        if (cant>0) {
            const nuevoItem = {
                _id,
                nombre,
                precio,
                img,
                categ,
                descrip,
                stock,
                sku,
                cantidad: cant
            }
            addToCarrito(nuevoItem);
        } else {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Cantidad debe Ser mayor a 0.',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }
   
    return (
        <div className="container" id="contenedorDetalle">
        {console.log(_id, nombre, precio, img, categ, descrip, stock, sku)}

            <div className="row">
                <div className="col">
                    <img src={process.env.PUBLIC_URL+img}  className="imgPpal" alt={nombre} />
                </div>
                <div className="col">
                    <div className="row mt-3">
                        <h2 className="tituloItem">{nombre}</h2>
                    </div>
                    <hr/>
                    <div className="row">
                        <p className="subTituloItem">SKU {sku} --- {categ}</p>
                    </div>
                    <hr/>
                    <div className="row">
                        <p className="subTituloItem">Cantidad Disponible: {stock} </p>
                    </div>
                    <hr/>
                    <div className="row">
                        <p className="precioDetalle">Precio: $ {formatoSepMiles(precio, 2)} -</p>
                    </div>                    
                    <div className="row align-items-center mt-5">
                            {
                                estaEnCarrito(_id) 
                                    ?   <>
                                            <div className="col col-12">
                                                <Link to="/carrito" className="btn btn-success mx-3"><Pagar color="white" size="25px"/> Ir Al Carrito</Link>
                                                <Alert variant="success m-3">En el Carrito podrás Editar las Cantidades Seleccionadas de tu Compra.</Alert>
                                            </div>
                                        </>
                                    :   <>
                                            <div className="col col-xs-12 col-md-6">
                                                <span className="subTituloItem">Cantidad : </span>
                                                <Button variant="danger-outline mx-1" onClick={handleMenos}><FaMinus color="#FF305D" size="25px"/></Button>
                                                <input type="number" className="cantP" value={cant} onChange={handleCant}/>
                                                <Button variant="success-outline" onClick={handleMas}><FaPlus color="#FF305D" size="25px"/></Button>
                                            </div>
                                            <div className="col col-xs-12 col-md-6">
                                                <Button variant="secondary" onClick={agregarCarro}><Carro color="white" size="25px"/> Agregar al Carrito</Button>
                                            </div>
                                        </>                    
                            }
                        
                    </div>
                    {
                        excede 
                            ? <Alert variant="danger m-3">No Podés seleccionar mas de {stock} Unidades</Alert>
                            : <></>
                    }
                    <div className="row align-items-center mt-5">                  
                        <div className="col col-12 col-4">
                            <Button variant="success" onClick={() => goBack()}><Back color="white" size="25px"/> Volver A Comprar</Button>
                        </div>                  
                    </div>                    
                </div>
            </div>
            <div className="row">
                <div className="row">
                    <p className="descrip">{descrip}</p>
                </div>
            </div>
        </div>
    )
}