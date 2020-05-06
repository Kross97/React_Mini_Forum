import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { enableBatching } from 'redux-batched-actions';
import { Application } from './Componets/Application';
import reducer from './reducers';
import './locales';

export const store = configureStore({
  reducer: enableBatching(reducer),
});

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.querySelector('#content'),
);
