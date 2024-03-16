import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from './context/AuthContext.jsx';
import { SocketProvider } from './context/SocketProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <AuthContextProvider>
          <ToastContainer theme='dark' position='top-right' autoClose={2500} closeOnClick pauseOnHover={false} />
          <App />
        </AuthContextProvider>
      </SocketProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
