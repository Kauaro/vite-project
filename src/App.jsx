import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext';
import { DataProvider } from './components/contexts/DataContext';
import AppRoutes from './components/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppRoutes />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
