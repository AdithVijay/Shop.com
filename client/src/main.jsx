import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { Provider } from 'react-redux';
import store from "./redux/Store.jsx"
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId="968461199722-dm742j8g4qiv880kq96s9bcomg13vmfd.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
