import React from 'react';

import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import persistState from 'redux-localstorage';

import logState from '../middlewares/logState.js';
import logAction from '../middlewares/logAction.js';
import reducer from '../reducers/dailyState';

import Daily from './Daily.js';
import DevTools from './DevTools.js';

const STYLE_APP = { color: 'black', fontFamily: 'Roboto', padding: 10 };
const STYLE_TITLE = { fontSize: 30, fontFamily: 'Roboto', fontWeight: 'bold', margin: 0, padding: 10, backgroundColor: 'rgba(0,0,0,0.5)', color: '#eee' };


const DEFAULT_STATE = {
  users: [
    { id: 1, name: 'JC', photo: 'https://randomuser.me/api/portraits/thumb/men/92.jpg', tasks: [ { id: 1, text: 'Trying to make the state works', cdate: '2016-01-27', ddate: '2016-02-01' }, { id: 2, text: 'Trying to find which background-color fits', cdate: '2016-02-01', ddate: '2016-02-03' } ]},
    { id: 2, name: 'JR', photo: 'https://randomuser.me/api/portraits/thumb/men/91.jpg', tasks: [ { id: 3, text: 'Refactor the whole project', cdate: '2016-02-01', ddate: '2016-02-03' }, { id: 4, text: 'Sending some emails', cdate: '2016-02-01', ddate: null } ]},
    { id: 3, name: 'JP', photo: 'https://randomuser.me/api/portraits/thumb/men/90.jpg', tasks: [ { id: 5, text: 'Do some big data', cdate: '2016-02-04', ddate: null }, { id: 6, text: 'Create a new JS framework', cdate: '2016-02-02', ddate: null } ]},
  ]
};

const storeEnhancer = applyMiddleware(logState, logAction);
const createPersistentStore = compose(persistState(), DevTools.instrument())(createStore);
const createEnhancedStore = storeEnhancer(createPersistentStore);
const store = createEnhancedStore(reducer, DEFAULT_STATE);

// The store will injected into the React context.
// To get it back, components must be wrapped with : connect()(Component)
export default () =>
  <div style={STYLE_APP}>
    <h1 style={STYLE_TITLE}>Never forget your daily</h1>
    <Provider store={store}>
      <div>
        <Daily />
        <DevTools />
      </div>
    </Provider>
  </div>;
