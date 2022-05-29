import React from "react";
import Busqueda from './context/BusquedaContext';
import CarritoProvider from './context/CarritoContext';
import FormatosProvider from './context/FormatosContext';
import { HomeView } from './components/HomeView/HomeView.component';
import { NavBar } from './components/NavBar/NavBar.component';
import { CheckOut } from './components/CheckOut/CheckOut.component'
import { Registrarse } from './components/Login/Registrarse.component'
import { ItemListContainer } from './components/ItemList/ItemListContainer';
import { Carrito } from './components/Carrito/Carrito.component';
import { Ordenes } from './components/Ordenes/Ordenes.component';
import { FormChat } from './components/Chat/Chat.component';
import { TablaTest } from './components/Test/Test.component';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
import { ItemDetalleContainer } from './components/ItemDetalle/ItemDetalleContainer';

function App() {
  const nombreEmpresa = 'Cotillón Casa Chiche';
  const urlLogoPpal = 'logo512.png';
  return (
    <div className="App">
      <Busqueda>
        <FormatosProvider>
          <CarritoProvider>
            <BrowserRouter>
              <NavBar nombreEmpresa={nombreEmpresa} urlLogoPpal={urlLogoPpal}/>
              <div id="contenidoPpal">
                <HomeView nombreEmpresa={nombreEmpresa} urlLogoPpal={urlLogoPpal} />
                  <Switch>
                    <Route exact path="/">
                      <ItemListContainer />
                    </Route>
                    <Route exact path="/detalle/:category">
                      <ItemListContainer />
                    </Route>
                    <Route exact path="/producto/:itemId">
                      <ItemDetalleContainer />
                    </Route>
                    <Route exact path="/carrito">
                      <Carrito/>
                    </Route>
                    <Route exact path="/checkout">
                      <CheckOut/>
                    </Route>
                    <Route exact path="/registrarse">
                      <Registrarse/>
                    </Route>
                    <Route exact path="/ordenes">
                      <Ordenes/>
                    </Route>
                    <Route exact path="/chat">
                      <FormChat/>
                    </Route>
                    <Route exact path="/test">
                      <TablaTest/>
                    </Route>
                    <Route path="*">
                      <Redirect to="/"/>
                    </Route>
                  </Switch>
              </div>
            </BrowserRouter>
          </CarritoProvider>
        </FormatosProvider>
      </Busqueda>
    </div>
  );
}

export default App;
