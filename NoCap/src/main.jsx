import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize Requestly SDK
if (window.RQ) {
  window.RQ.init({
    projectId: "nocap-fact-checker", // A friendly ID for your project
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
