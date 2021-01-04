import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

import './index.scss';
import store from './lib/store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
