import React from 'react';
import ReactDom from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import users from './redux/users';
import getRoutes from './config/routes';
import './styles/index.css';

function checkAuth(foo, bar) {
  debugger;
  console.log('foo', foo, 'bar', bar);
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  users,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
/* eslint-enable */

ReactDom.render(
  <Provider store={store} >
    {getRoutes(checkAuth)}
  </Provider>,
  document.getElementById('app'),
);
