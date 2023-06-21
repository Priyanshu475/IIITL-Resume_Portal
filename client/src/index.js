import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DatasContextProvider } from './context/DataContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DatasContextProvider>
        <App />
      </DatasContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);