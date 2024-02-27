import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import "./App.sass"
import "./css@3.css" // https://cdn.jsdelivr.net/npm/@docsearch/css@3
import "boosted/dist/css/orange-helvetica.min.css"
import "boosted/dist/css/boosted.min.css"


ReactDOM.createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
