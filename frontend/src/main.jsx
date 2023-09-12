import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BlogContextProvider } from './context/BlogContext.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BlogContextProvider>
        <App />
      </BlogContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
