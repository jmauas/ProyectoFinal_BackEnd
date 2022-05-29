import React, {useContext, useEffect} from "react";
import './Carrito.css';
import { useHistory } from 'react-router';
import { CarritoContext } from '../../context/CarritoContext';
import { FormatosContext } from '../../context/FormatosContext';
import { Container, Alert, Table, Button, } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBackspace as Back, FaPlus, FaMinus, FaRegTrashAlt as Trash } from 'react-icons/fa';
import { IoBagCheck as Bag} from 'react-icons/io5';
import { UserAuthContext } from "../../context/LoginContext";


export const Carrito = () => {
    const {carrito, vaciarCarrito, removeItem, calcularTotal, cambiarCant} = useContext(CarritoContext);
    const {formatoSepMiles} = useContext(FormatosContext);
    const {goBack} = useHistory();
    const {isAuthenticated, setIsAuthenticated} = useContext(UserAuthContext);

        
    const handleCant = (e) => {
        cambiarCant(e.target.name, e.target.value)
    }

    const styleBtn = (tipo, stock, cant) => {
        let rsdo;
        tipo === 1
            ?
                cant>=stock ? rsdo = "btn btn-danger sm mx-3" : rsdo = "btn btn-light sm mx-3"
            :
                cant<=1 ? rsdo = "btn btn-danger sm mx-3" : rsdo = "btn btn-light sm mx-3"
        return rsdo
    }
    useEffect(() => {      
        if (!isAuthenticated){
            setIsAuthenticated(true);
            setIsAuthenticated(false);
        } 
    }, [isAuthenticated, setIsAuthenticated])
    return (
        <>
            <Container>
                {
                    <> 
                        {
                            carrito.length === 0
                            ?   <>
                                    <Alert variant="warning m-3">No Hay Productos en el Carrito aún.</Alert>
                                    <Button variant="success" onClick={() => goBack()}><Back color="white" size="25px"/> Volver A Comprar</Button>
                                </>
                            :    
                                <>           
                                <Table striped bordered hover variant="warning" size="sm">
                                    <thead>
                                        <tr>
                                            <th colSpan="3">PRODUCTO</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Total</th>
                                            <th>Borrar</th>
                                        </tr>
                                    </thead> 
                                    <tbody>
                                        {                                 
                                            carrito.map((prod) => (
                                                <tr key={prod.id} className="filaProducto" valign="middle">
                                                    <td><Link to={`/producto/${prod._id}`}><img src={process.env.PUBLIC_URL+prod.img}  alt={prod.nombre} className="imgCarrito" /></Link></td>
                                                    <td><span className="mx-3">{prod.sku}</span></td>
                                                    <td><span className="mx-3 nombreProductoCarrito">{prod.nombre}</span></td>
                                                    <td>
                                                        <button className={styleBtn(-1, prod.stock, prod.cantidad)} onClick={() => cambiarCant(prod.id, prod.cantidad-1)}><FaMinus color="#FF305D" size="12px"/></button>
                                                        <input type="number" className="cantP" value={prod.cantidad} onChange={handleCant} name={prod.id}/>
                                                        <button className={styleBtn(1, prod.stock, prod.cantidad)} onClick={() => cambiarCant(prod.id, prod.cantidad+1)}><FaPlus color="#FF305D" size="12px"/></button>
                                                    </td>
                                                    <td className="importeCarrito">$ {formatoSepMiles(prod.precio, 2)}</td>
                                                    <td className="importeCarrito">$ {formatoSepMiles(Number(prod.cantidad) * (prod.precio), 0)}</td>
                                                    <td><Button variant="danger mx-3" onClick={() => removeItem(prod.id)}><Trash color="white" size="25px"/></Button></td>
                                                </tr>                                        
                                            ))
                                        }                                    
                                    </tbody>
                                    <tfoot>
                                        <tr className="totalCarrito">
                                            <td colSpan="4">IMPORTE TOTAL COMPRA</td>
                                            <td colSpan="2">$ {formatoSepMiles(calcularTotal(), 2)}</td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </Table>
                                <div className="row align-items-center mt-5">
                                    <div className="col col-4">
                                        <Link to="/checkout" className="btn btn-success mx-3">
                                            <Bag size="30px"/> Terminar mi Compra
                                        </Link>               
                                    </div>  
                                    <div className="col col-4">
                                        <Button variant="success" onClick={() => goBack()}><Back color="white" size="25px"/> Volver A Comprar</Button>
                                    </div>  
                                    <div className="col col-4">
                                        <Button variant="danger" onClick={() => vaciarCarrito(true)}><Trash color="white" size="25px"/> Vaciar Carrito</Button>
                                    </div>                  
                                </div>                        
                            </>
                        }
                    </>
                }
            </Container> 
        </>
    );

}