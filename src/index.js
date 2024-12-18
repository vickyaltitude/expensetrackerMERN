import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContextProvider from './store/ContextProvider';
import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
    
    <ContextProvider>
    <App />
    </ContextProvider>

    </BrowserRouter>
 
);
