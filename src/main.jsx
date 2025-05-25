import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
   
   const root = ReactDOM.createRoot(document.getElementById('root')); // Criar a raiz
   root.render(
  <React.StrictMode>            
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>
   );
