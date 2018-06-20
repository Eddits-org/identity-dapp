import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import App from 'components/App.component';
import AppReducer from 'reducers';
import preloadState from 'reducers/Preload';

import { fetchClaimCost } from 'actions/Claims.action';

require('assets/styles/bulma.scss');
require('assets/styles/custom.scss');

import 'react-select/dist/react-select.css';

const logger = createLogger();

const store = createStore(
  AppReducer,
  preloadState(),
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : applyMiddleware(thunk, logger)
);

ReactDOM.render(
  <Provider {...{ store }}>
    <App {...{ store }} />
  </Provider>,
  document.querySelector('#app')
);

// Initial data loads
store.dispatch(fetchClaimCost());
