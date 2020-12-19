import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import App from './App';

import './index.scss';
import MyMap from './map/index';


ReactDOM.render(
  <React.StrictMode>
    <App />
    <MyMap />
  </React.StrictMode>,
  document.getElementById('root')
);
