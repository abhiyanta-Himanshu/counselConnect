/* eslint-disable no-unused-vars */
import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Toaster } from 'sonner'

//redux
import { Provider } from 'react-redux'
import store from "./redux/store.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

      <App />
      
    </Provider>
    <Toaster />
  </StrictMode>,
)
