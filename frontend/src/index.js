import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ConfigsProvider from './context/ConfigsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigsProvider>
      <App />
    </ConfigsProvider>
  </React.StrictMode>
);

reportWebVitals();
