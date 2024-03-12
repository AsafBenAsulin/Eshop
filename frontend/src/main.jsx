import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import axios from 'axios'
import {StoreProvider} from "./store.jsx"


const baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = baseURL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>,
)
