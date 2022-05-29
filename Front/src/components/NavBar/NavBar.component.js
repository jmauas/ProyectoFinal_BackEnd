import React from "react";
import './NavBar.css';
import { FaFutbol, FaCaretSquareRight as Flecha, FaScroll, FaBirthdayCake as Torta, FaShoppingCart as Carro, FaRocketchat as Chat} from 'react-icons/fa';
import {TiHome} from 'react-icons/ti';
import { NavLink } from 'react-router-dom'


const mouseEnterHandler = () => {
    mouseHandler(true);
} 
const mouseLeaveHandler = () => {
    mouseHandler(false);
} 
const mouseHandler = (show) => {
    let cont = document.getElementById('contenidoPpal');
    let margin = '50px';
    if (window.screen.width) margin = '25px';
    if (show)  margin = '200px';        
    cont.style.marginLeft = margin;
}

export const NavBar = ({nombreEmpresa, urlLogoPpal}) => {
    return (
        <>
            <nav className="sideBar"
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
            >
                <div className="barraNegra">'
                    <Flecha color="#FF305D" size="40px"/>    
                </div>
                <p className="s-nombre">{nombreEmpresa}</p>

                <ul>
                    <li><NavLink activeClassName={'activeLink'} className="items" exact to="/"><TiHome color="#FF305D" size="25px"/> Inicio</NavLink></li>
                    <li><NavLink activeClassName={'activeLink'} className="items" exact to="/productos/cotillon"><FaFutbol color="#00CBF4" size="25px"/> Cotillón</NavLink></li>
                    <li><NavLink activeClassName={'activeLink'} className="items" exact to="/productos/papeleria"><FaScroll color="#FFC200" size="25px"/> Papeleria</NavLink></li>
                    <li><NavLink activeClassName={'activeLink'} className="items" exact to="/productos/reposteria"><Torta color="#FF305D" size="25px"/> Repostería</NavLink></li>
                    <li><NavLink activeClassName={'activeLink'} className="items" exact to="/productos/distribucion"><FaFutbol color="#FFC200" size="25px"/> Distribución</NavLink></li>
                    <li><NavLink activeClassName={'activeLink'} className="items" exact to="/carrito"><Carro color="red" size="25px"/> Ver Carrito</NavLink></li>
                    <li><NavLink activeClassName={'activeLink'} className="items" exact to="/chat"><Chat color="#00CBF4" size="25px"/> Chat</NavLink></li>
                    <li><NavLink activeClassName={'activeLink'} className="items" exact to="/test"><Carro color="red" size="25px"/> Test Productos</NavLink></li>
                </ul>
                <NavLink exact to="/"><img src={process.env.PUBLIC_URL+'/'+urlLogoPpal}  className="s-logo" alt="logo empresa" /></NavLink>
            </nav>
        </>
    );
 }