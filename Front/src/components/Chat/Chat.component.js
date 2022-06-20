import React, { useEffect, useContext } from 'react'
import { UserAuthContext } from "../../context/LoginContext";
import io from 'socket.io-client';
import 'dotenv/config';
const server = process.env.REACT_APP_SERVER;
const socket = io(server)

export const FormChat = () => {
    console.log(server)
    const {isAuthenticated, setIsAuthenticated} = useContext(UserAuthContext);
    const montarSocket = () => {
        socket.on('Bienvenida', (data) => {
            const p = document.getElementById('msg');
            p.innerHTML = data.msg;
            socket.emit('notificacion', 'Mensaje Recibido con Éxito');
        });


        socket.on('mensajeBack', (data) => {
            const msgs = document.getElementById('msgs');
            let html = '<table class="table table-condensed"><tr><th>NOMBRE</th><th>APELLIDO</th><th>E-MAIL</th><th>IMG</th><th>ENVIO</th><th>MENSAJE</th></tr>';
            const sMail = 'style="color: blue; font-weight: bold;"';
            const sFh = 'style="color: brown; font-weight: normal;"';
            const sMsg = 'style="color: green; font-weight: normal; font-style: italic"';
            data.map( m => {
                html += `<tr key=${m.author.fh}>
                            <td>${m.author.nombre}</td>
                            <td>${m.author.apellido}</td>
                            <td ${sMail}>${m.author.id}</td>
                            <td><img width="50px" src=${m.author.avatar}/></td>
                            <td ${sFh}>${formatoFecha(new Date(m.author.fh), 1)}</td>
                            <td ${sMsg}>${m.text}</td>
                        </tr>`;
                return '';
            })
            html += '</table>'
            msgs.innerHTML = html;
        });
    }

    const enviarMsg = () => {
        const usuario = document.getElementById('usuario');    
        const apellido = document.getElementById('apellido');    
        const mail = document.getElementById('mail');    
        const mensaje = document.getElementById('mensaje');
        const edad = document.getElementById('edad');
        const alias = document.getElementById('alias');
        const fh = new Date();
        if (mail.value.length<4) {
            alert('MAIL ES OBLIGATORIO');
        } else {
            socket.emit('mensajeFront', {us: usuario.value, apellido: apellido.value, mail: mail.value
                                        , edad: edad.value, alias: alias.value, mensaje: mensaje.value, fh: fh});   
            mensaje.value = ''; 
        }
    }
    const formatoFecha = (fh) => {
        let fhtxt = `${zfill(parseInt(fh.getDate()), 2)}/${zfill((parseInt(fh.getMonth())+1), 2)}/${parseInt(fh.getFullYear())}`;
        fhtxt +=  ` ${zfill(parseInt(fh.getHours()), 2)}:${zfill(parseInt(fh.getMinutes()), 2)}:${zfill(parseInt(fh.getSeconds()), 2)}`;
        return fhtxt;
    }
    
    const zfill = (number, width, deci) => {
        let numberOutput = Math.abs(number); /* Valor absoluto del n�mero */
        if (deci!==undefined||deci>0) {
            numberOutput = Number.parseFloat(numberOutput).toFixed(deci).toString();
        }
        let length = numberOutput.toString().length; /* Largo del n�mero */
        let zero = "0"; /* String de cero */
        if (width <= length) {
            if (number < 0) {			
                return ("-" + numberOutput.toString());
            } else {
                return numberOutput.toString();
            }
        } else {
            if (number < 0) {
                return ("-" + (zero.repeat(width - length - 1)) + numberOutput.toString());
            } else {
                return zero.repeat(width - length) + numberOutput.toString();
            }
        }
    }

    useEffect(() => {
      if (!isAuthenticated){
        setIsAuthenticated(true);
        setIsAuthenticated(false);
      }
      montarSocket();
    })    
    
    return (
        <div className="container mx-5">
            <h4>Hacenos tus Consultas por Chat</h4>
            <p id="msg"></p>
            <div className="row align-items-center">
                <div className="col-sm-3 col-md-auto">
                    <label htmlFor="usuario" className="form-label">Nombre: </label>
                </div>
                <div className="col-sm-9 col-md-auto">
                    <input type="text" className="form-control" id="usuario" placeholder="Nombre"/>
                </div>
                <div className="col-sm-3 col-md-auto">
                    <label htmlFor="apellido" className="form-label">Apellido: </label>
                </div>
                <div className="col-sm-9 col-md-auto">
                    <input type="text" className="form-control" id="apellido" placeholder="Apellido"/>
                </div>
                <div className="col-sm-3 col-md-auto">
                    <label htmlFor="mail" className="form-label">Mail</label>
                </div>
                <div className="col-sm-9 col-md-auto">
                    <input type="email" className="form-control" id="mail" placeholder="E-Mail"/>
                </div>
                <div className="col-sm-3 col-md-auto">
                    <label htmlFor="edad" className="form-label">Edad</label>
                </div>
                <div className="col-sm-9 col-md-auto">
                    <input type="number" className="form-control" id="edad" placeholder="Edad"/>
                </div>
                <div className="col-sm-3 col-md-auto">
                    <label htmlFor="alias" className="form-label">Alias</label>
                </div>
                <div className="col-sm-9 col-md-auto">
                    <input type="text" className="form-control" id="alias" placeholder="Alias"/>
                </div>
                <div className="col-sm-3 col-md-auto">
                    <label htmlFor="texto" className="form-label">Mensaje: </label>
                </div>
                <div className="col-sm-p col-md-auto">
                    <input type="text" className="form-control" id="mensaje" placeholder="Mensaje"/>
                </div>
                <div className="col-auto">
                    <button className="btn btn-success m-3" onClick={enviarMsg}><i className="bi bi-send"></i> Enviar</button>
                </div>
            </div>
            <h5 className="m-3">Mensajes</h5>
            <div className="m-3" id="msgs">                
            </div>
        </div>          
    )
}
