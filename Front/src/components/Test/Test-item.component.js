import { useContext } from 'react';
import { FormatosContext } from '../../context/FormatosContext';

export const Item = ( {_id, nombre, precio, img} ) => {
    const {formatoSepMiles} = useContext(FormatosContext);

    return (
        <tr key={_id} valign="middle">
            <td>{_id}</td>
            <td>{nombre}</td>
            <td>{formatoSepMiles(precio, 2)}</td>
            <td><img width="200px" src={img} alt="imagen" key={'img'+_id}/></td>
        </tr>
    )
}