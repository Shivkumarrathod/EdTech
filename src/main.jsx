import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import {BrowserRouter} from 'react-router-dom'
import { FirebaseProvider } from './firebaseContext/Firebase.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <FirebaseProvider>
      <PayPalScriptProvider>
      <App />
      </PayPalScriptProvider>
     </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
