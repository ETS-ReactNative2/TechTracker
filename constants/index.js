import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import React from 'react';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import myReducer from '../reducer/reducer'



const myStore = createStore(myReducer,applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={myStore}> <App /> </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);