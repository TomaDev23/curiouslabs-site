import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import initializePerformance from './utils/initializePerformance'
import { ScrollProvider } from './context/ScrollContext'

// ⛔ Performance monitor temporarily disabled for audit
// if (process.env.NODE_ENV === 'development') {
//   initializePerformance();
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollProvider>
          <App />
        </ScrollProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
