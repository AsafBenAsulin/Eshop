import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { StoreProvider } from "frontend/src/Store.jsx";


axios.defaults.baseURL = "https://eshop-ruddy.vercel.app/" || "http://localhost:8080"; // Change this to server once we have one in production or import from .env

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
