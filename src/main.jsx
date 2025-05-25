import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './components/AppRoutes.jsx';
   
   const root = ReactDOM.createRoot(document.getElementById('root')); // Criar a raiz
   root.render(
  <React.StrictMode>            
  
    <AppRoutes />
  
</React.StrictMode>
   );
