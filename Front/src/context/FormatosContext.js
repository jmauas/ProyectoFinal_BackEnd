import React, { createContext} from 'react';

export const FormatosContext = createContext();

const FormatosProvider = ( {children} ) => {

    const formatoSepMiles = (valor, deci=0) => {
        valor = Number(valor);
        return new Intl.NumberFormat("de-DE", {style: 'decimal', minimumFractionDigits: deci, maximumFractionDigits: deci}).format(valor);
    }
      
    return (
        <FormatosContext.Provider value={ {
            formatoSepMiles
        }}>
            {children}
        </FormatosContext.Provider>
    )
}
export default FormatosProvider; 


