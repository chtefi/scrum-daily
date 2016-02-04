import React from 'react';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import logState from '../middlewares/logState.js';
import logAction from '../middlewares/logAction.js';
import reducer from '../reducers/dailyState';

import Daily from './Daily.js';

const STYLE_APP = { color: 'black', fontFamily: 'Roboto', padding: 10 };

const storeEnhancer = applyMiddleware(logState, logAction);
const createEnhancedStore = storeEnhancer(createStore);
const store = createEnhancedStore(reducer);

// The store will injected into the React context.
// To get it back, components must be wrapped with : connect()(Component)
export default () =>
  <div style={STYLE_APP}>
    <Provider store={store}>
      <Daily />
    </Provider>
  </div>;
