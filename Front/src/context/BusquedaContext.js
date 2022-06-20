import React, {createContext, useState} from "react";

export const BusquedaContext  = createContext();

const BusquedaProvider = ( {children} ) => {
    const [busqueda, setBusqueda] = useState('');
    
    const [usuario, setUsuario] = useState({
        username: '',
        nombre: '',
        apellido: '',
        email: '',
        username: '',
        codPais: '',
        tel: '',
        domicilio: '',
        localidad: '',
        provincia: '',
        dni: '',
        password: '',
        img: ''
    })
    return (
        <>
            <BusquedaContext.Provider value={{
                busqueda,
                setBusqueda,
                usuario,
                setUsuario
            }}>
                {children};
            </BusquedaContext.Provider>
        </>
    );
}
export default BusquedaProvider;