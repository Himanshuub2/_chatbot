import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import { MsalProvider } from "@azure/msal-react";
// import {msalApp} from "./auth/msalconfig"
// import { AuthProvider } from './auth/AuthProvider';
import { store } from "./redux/store"
import { Provider } from 'react-redux'



ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <AuthProvider>
      <Provider store = {store}>
      <App/>
      </Provider>
    // </AuthProvider>
  // </React.StrictMode>,
)

