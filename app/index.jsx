import React from 'react';
import ReactDom from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import restricted from './helpers/restricted';
import getRoutes from './config/routes';
import reducer from './redux/modules';
import './styles/index.css';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
/* eslint-enable */

ReactDom.render(
  <Provider store={store} >
    {getRoutes(Component => restricted(Component, store))}
  </Provider>,
  document.getElementById('app'),
);
