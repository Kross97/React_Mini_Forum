import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Application } from './Componets/Application';
import reducer from './reducers';

export const store = configureStore({
  reducer,
});

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.querySelector('#content'),
);
