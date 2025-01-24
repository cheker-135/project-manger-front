import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Toaster position="top-right" />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
