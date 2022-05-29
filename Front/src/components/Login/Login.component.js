import { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../../context/LoginContext";
import { BiLogIn, BiExit, BiShoppingBag as Bag } from "react-icons/bi";
import { Modal, Button } from "react-bootstrap";
import { BusquedaContext } from "../../context/BusquedaContext";
import './Login.css';
import { useHistory } from 'react-router';
import { pedirUsuario, logOut } from "../../modelos/usuarios.models";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export const UserAuthenticate = () => {
    const history = useHistory();
    const {isAuthenticated, setIsAuthenticated} = useContext(UserAuthContext);
    const {usuario, setUsuario} = useContext(BusquedaContext);

    const [show, setShow] = useState(false);

    const [nombreUsuario, setNombreUsuario] = useState('');
    const [pass, setPass] = useState('');
    
    const handleClose = () => setShow(false);
    
    const handleShow = () => setShow(true);
     
    const handleSubmit =(e) => {
        e.preventDefault();
        pedirUsuario(nombreUsuario, '', pass, (res) => {
            if (res.username!=null) {
                setUsuario(res);
                setIsAuthenticated(true);
                history.push('/');
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Usario o Contraseña Incorrecto.',
                    showConfirmButton: false,
                    timer: 2500
                })
            }
        })
    }

    const handleSalir = () => {
        logOut(() => {
            setShow(false);
            setIsAuthenticated(false);
            setNombreUsuario('');
            history.push('/');      
        })
    }

    const handleRegis = () => { 
        setShow(false);
        history.push('/registrarse');        
    }

    const handleEmailChange = (e) => {
        setNombreUsuario(e.target.value)
    }

    const handlePassChange = (e) => {
        setPass(e.target.value)
    }

    useEffect(() => {
        if (isAuthenticated) {
            setShow(false);
        } else {
            setShow(true)          
        }
    }, [isAuthenticated])
 
    return (    
    <>
        <div className="container">
            {
                isAuthenticated 
                ?
                    <>
                        <span className="animate__animated animate__fadeInDownBig">Bienvenido <span className="nombreUsuario animate__animated animate__fadeInDownBig">{usuario.nombre}</span></span>
                        <button className="btn btn-info btn-sm mx-2 animate__animated animate__fadeInUpBig" onClick={handleSalir}> <BiExit color="#FF305D" size="15px"/> Salir </button>
                        <Link to="/ordenes">
                            <button className="btn btn-primary btn-sm mx-2 animate__animated animate__fadeInUpBig" > <Bag color="#FF305D" size="15px"/> Ver Compras </button>
                        </Link>
                    </>
                :
                <>
                    <button className="btn btn-info btn-sm animate__animated animate__fadeInRightBig" onClick={handleShow}> <BiLogIn color="#FF305D" size="25px"/> Login </button>
                </>
            }
             <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title className='text-center m-4 font-weight-bold'>Inicio Sesión </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container align-items-center justify-content-space'>
                        <div className='row align-items-center justify-content-space'>
                            <div className='col'>
                                <form className='p-0'>                                        
                                    <div className='form-group mb-2'>
                                        <label>Email</label>
                                        <input
                                            type='email'
                                            className='form-control'
                                            placeholder='Ingrese su email'
                                            name='email'
                                            value={nombreUsuario}
                                            onChange={handleEmailChange}
                                        />
                                        </div>
                                        <div className='form-group mb-2'>
                                        <label>Password</label>
                                        <input
                                            type='password'
                                            className='form-control'
                                            placeholder='Ingrese su password'
                                            name='password'
                                            value={pass}
                                            onChange={handlePassChange}
                                        />
                                    </div>
                                    <button
                                        type='submit'
                                        className='btn btn-primary font-weight-bold text-uppercase d-block w-100 mt-4'
                                        onClick={handleSubmit}
                                    >Log in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="info btn-sm" onClick={handleRegis}>
                    Registrarse
                </Button>
                <Button variant="secondary btn-sm" onClick={handleClose}>
                    Cerrar
                </Button>                    
                </Modal.Footer>
            </Modal>
        </div>
    </>
    );
}