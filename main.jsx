import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import App from './src/components/App';
import './src/index.css';
import { Provider } from 'react-redux'; 
import { store, persistor } from './src/redux/store'; 
import { PersistGate } from 'redux-persist/integration/react';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);