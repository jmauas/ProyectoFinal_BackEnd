import React, {useContext, useEffect, useState, useCallback} from "react";
import './HomeView.css';
import { NavLink } from 'react-router-dom';
import { BusquedaContext } from '../../context/BusquedaContext';
import { FaSearch, FaSync, FaShoppingCart as Carro } from 'react-icons/fa';
import { Container, Row, Col, Toast, ToastContainer, Badge } from "react-bootstrap";
import { CarritoContext } from "../../context/CarritoContext";
import { Link, useHistory } from "react-router-dom";
import { UserAuthenticate } from "../Login/Login";
import 'animate.css';



export const HomeView = ({nombreEmpresa, urlLogoPpal}) => {
    const {busqueda, setBusqueda} = useContext(BusquedaContext);
    const [palabra, setPalabra] = useState('');
    const {carrito, calcularCantidad} = useContext(CarritoContext);
    const [show, setShow] = useState(false);
    const [shown, setShown] = useState(false);
    const history = useHistory();

    const handleInputChange = (e) => {
        setPalabra(e.target.value)
    }

    const handleBtnBusqueda = () => {
        if (palabra.length>=3) {
                history.push("/");
            handleBusqueda();
        }
    }
    
    const handleBusqueda = useCallback(
        () => {
                if (palabra.length>=3) {
                    setBusqueda(palabra);
                } else {
                    setBusqueda('');
                }
              }, [palabra, setBusqueda],
    )
    
    const handleLimpiar = () => {
        setBusqueda('');
        setPalabra('');
    };

    const onKeyUp = () => {
        if (palabra.length>=3) {
            handleBusqueda();
        }
    }

    useEffect(() => {
        if (busqueda.length<2) {
            setBusqueda('');
        }
    }, [busqueda, setBusqueda])
    
    useEffect(() => {
        if (carrito.length>0 && shown===false) {
            setShow(true);
            setShown(true);
        }
    }, [carrito, shown])

    return (
        <>
            <div className="container-fluid" id="home">
                <ToastContainer position="top-end" className="p-3">
                    <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide bg="warning">
                        <Toast.Header>
                            <Carro color="red" size="25px"/>
                            <strong className="me-auto">{'\u00A0\u00A0\u00A0\u00A0 Notificación'}</strong>
                        </Toast.Header>
                        <Toast.Body><span className="textoToast">Recuperamos Tu Carrito de Compras. Podes Continuar Comprando.</span></Toast.Body>
                    </Toast>
                </ToastContainer>
                <div className="row align-items-center">
                    <div className="col col-xl-3 col-lg-4 col-md-6 col-sm-12">
                        <NavLink exact to="/"><img src={process.env.PUBLIC_URL+'/'+urlLogoPpal} className="logoPpal" alt="logo empresa" /></NavLink>
                    </div>
                    <div className="col col-xl-9 col-lg-8 col-md-6 col-sm-12 align-self-center">
                        <div className="row align-items-center">
                            <Container>
                                <Row>
                                    <h1 className="tituloPpal">{nombreEmpresa}</h1>
                                </Row>
                                <Row className="filaBusqueda">
                                    <Col className="col col-xl-4 col-lg-6 col-md-12 col-sm-12">
                                        <input type="text" className="textoBusqueda" placeholder="Ingrese Texto a Buscar" value={palabra} onKeyPress={onKeyUp} onChange={handleInputChange}/>
                                    </Col>
                                    <Col className="col col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                        <button className="btn btn-secondary" onClick={handleBtnBusqueda}><FaSearch/> Buscar</button>
                                        <button className="btn btn-secondary m-2" id="btnLimpiar" onClick={handleLimpiar}><FaSync/> Limpiar</button>
                                    </Col>
                                    <Col className="col col-xl-1 col-lg-1 col-md-2 col-sm-2">
                                        {
                                            calcularCantidad()
                                             ?
                                                <Link to="/carrito">
                                                    <Carro color="red" size="40px" className="animate__animated animate__bounce" id="carritoAnimar"/>
                                                    <Badge pill bg="warning" text="dark" className="textoCantCarrito animate__animated animate__bounce animate__delay-1s">{calcularCantidad()}</Badge>
                                                </Link>
                                            :<></>
                                        }
                                    </Col>
                                    <Col className="col col-xl-3 col-lg-3 col-md-2 col-sm-2">                                       
                                        <UserAuthenticate/>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
