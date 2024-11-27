import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { Provider } from 'react-redux';
import store from "./redux/Store.jsx"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId="803561141946-tq6547qf6s45o2g1sjnj3lpv9bv15u0q.apps.googleusercontent.com">
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
