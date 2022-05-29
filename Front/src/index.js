import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { UserAuthProvider } from './context/LoginContext';


ReactDOM.render(
  <React.StrictMode>
    <UserAuthProvider>
      <App />
    </UserAuthProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);
