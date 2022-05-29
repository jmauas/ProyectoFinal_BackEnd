import React, { useContext } from 'react'
import { BusquedaContext } from "../../context/BusquedaContext";
import { Badge } from 'react-bootstrap';
import { BsCheckCircle as Check } from 'react-icons/bs';


export const FormUsuario = ({enviar, loading}) => {
    const {usuario, setUsuario} = useContext(BusquedaContext);

    const handleInputChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
            username: usuario.email
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        enviar();
    }
    
    return (
            <div className="container my-5">
                <form onSubmit={handleSubmit}>
                    <div className="row align-items-center">
                        <div className="col-lg-2 col-md-4 col-xs-12">
                            <input
                                className="form-control m-2"
                                type="text"
                                placeholder="Nombre"
                                name="nombre"
                                value={usuario.nombre}
                                onChange={handleInputChange}
                                />
                        </div>
                        <div className="col-2">
                            {usuario.nombre.length === 0 && <Badge pill bg="warning" text="dark">Nombre es obligatorio</Badge>}
                        </div>
                        <div className="col-lg-2 col-md-4 col-xs-12">
                            <input
                                className="form-control m-2"
                                type="text"
                                placeholder="Apellido"
                                name="apellido"
                                value={usuario.apellido}
                                onChange={handleInputChange}
                                />
                        </div>
                        <div className="col-2">
                            {usuario.apellido.length === 0 && <Badge pill bg="warning" text="dark">Apellido es obligatorio</Badge>}
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-lg-2 col-md-4 col-xs-12">
                            <input
                                className="form-control m-2"
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={usuario.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-2">
                            {usuario.email.length === 0 && <Badge pill bg="warning" text="dark">E-Mail es obligatorio</Badge>}
                        </div>
                        <div className="col-lg-2 col-md-4 col-xs-12">
                            <input
                                className="form-control m-2"
                                type="tel"
                                placeholder="Teléfono"
                                name="tel"
                                value={usuario.tel}
                                onChange={handleInputChange}
                            />
                         </div>
                        <div className="col-2">
                            {usuario.tel.length === 0 && <Badge pill bg="warning" text="dark">Teléfono es obligatorio</Badge>}
                         </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-lg-2 col-md-4 col-xs-12">
                            <input
                                className="form-control m-2"
                                type="text"
                                placeholder="Domicilio"
                                name="domicilio"
                                value={usuario.domicilio}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-2">
                            {usuario.domicilio.length === 0 && <Badge pill bg="warning" text="dark">Domicilio es obligatorio</Badge>}                 
                        </div>
                        <div className="col-lg-2 col-md-4 col-xs-12">
                            <input
                                className="form-control m-2"
                                type="text"
                                placeholder="Localidad"
                                name="localidad"
                                value={usuario.localidad}
                                onChange={handleInputChange}
                            />
                         </div>
                        <div className="col-2">
                            {usuario.localidad.length === 0 && <Badge pill bg="warning" text="dark">Localidad es obligatorio</Badge>}
                        </div>
                        <div className="col-lg-2 col-md-4 col-xs-12">
                            <input
                                className="form-control m-2"
                                type="text"
                                placeholder="Provincia"
                                name="provincia"
                                value={usuario.provincia}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-2">
                            {usuario.provincia.length === 0 && <Badge pill bg="warning" text="dark">Provincia es obligatorio</Badge>}
                        </div>
                        <div className="col-lg-2 col-md-4 col-xs-12">
                            <input
                                className="form-control m-2"
                                type="number"
                                placeholder="D N I"
                                name="dni"
                                value={usuario.dni}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-2">
                            {usuario.dni.length < 7 && <Badge pill bg="warning" text="dark">DNI es obligatorio</Badge>}
                        </div>
                        <div className="col-lg-2 col-md-4 col-xs-12">
                            <input
                                className="form-control m-2"
                                type="password"
                                placeholder="PASSWORD"
                                name="password"
                                value={usuario.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-2">
                            {usuario.password.length < 8 && <Badge pill bg="warning" text="dark">Password debe ser Mayor a 8 caracteres</Badge>}
                        </div>
                    </div>
                    <button className="btn btn-success my-3" disabled={loading} type="submit"><Check size="25px"/> Registrar</button>
                </form>
            </div>
    )
}
