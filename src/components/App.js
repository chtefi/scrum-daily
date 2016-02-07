import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import persistState from 'redux-localstorage';

import logState from '../middlewares/logState.js';
import logAction from '../middlewares/logAction.js';
import reducer from '../reducers';

import Daily from './Daily.js';
import DevTools from './DevTools.js';

const STYLE_APP = { color: 'black', fontFamily: 'Roboto', padding: 10 };
const STYLE_TITLE = { fontSize: 30, fontFamily: 'Roboto', fontWeight: 'bold', margin: 0, marginBottom: 10, padding: 10, backgroundColor: 'rgba(0,0,0,0.5)', color: '#eee', borderRadius: 5 };


const DEFAULT_STATE = {
  users: [
    { id: 1, name: 'Oswald Cobblepot', photo: 'https://randomuser.me/api/portraits/thumb/men/92.jpg', tasks: [ { id: 1, text: 'Trying to make the state works', cdate: '2016-01-27', ddate: '2016-02-01' }, { id: 2, text: 'Trying to find which background-color fits', cdate: '2016-02-01', ddate: '2016-02-03' } ]},
    { id: 2, name: 'Butch Gilzean', photo: 'https://randomuser.me/api/portraits/thumb/men/91.jpg', tasks: [ { id: 3, text: 'Refactor the whole project', cdate: '2016-02-01', ddate: '2016-02-03' }, { id: 4, text: 'Sending some emails', cdate: '2016-02-01', ddate: null } ]},
    { id: 3, name: 'Fish Mooney', photo: 'https://randomuser.me/api/portraits/thumb/men/90.jpg', tasks: [ { id: 5, text: 'Do some big data', cdate: '2016-02-04', ddate: null }, { id: 6, text: 'Create a new JS framework', cdate: '2016-02-02', ddate: null } ]},
  ],
  weeks: {}
};

const storeEnhancer = applyMiddleware(logState, logAction);

// TODO(sd): Ultra ugly for now, must create distinct files to the stores, and for the root component
// because right now, we import the whole stuff in the production bundle : it sucks.
// https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md
const isProduction = (process.env.NODE_ENV === 'production');

const createPersistentStore = (isProduction ? compose(persistState())(createStore) : compose(persistState(), DevTools.instrument())(createStore));
const createEnhancedStore = storeEnhancer(createPersistentStore);
const store = createEnhancedStore(reducer, DEFAULT_STATE);

const GitHub = () =>
  <svg aria-hidden="true" height="28" role="img" version="1.1" viewBox="0 0 16 16" width="28" fill="#FFFFFF">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59 0.4 0.07 0.55-0.17 0.55-0.38 0-0.19-0.01-0.82-0.01-1.49-2.01 0.37-2.53-0.49-2.69-0.94-0.09-0.23-0.48-0.94-0.82-1.13-0.28-0.15-0.68-0.52-0.01-0.53 0.63-0.01 1.08 0.58 1.23 0.82 0.72 1.21 1.87 0.87 2.33 0.66 0.07-0.52 0.28-0.87 0.51-1.07-1.78-0.2-3.64-0.89-3.64-3.95 0-0.87 0.31-1.59 0.82-2.15-0.08-0.2-0.36-1.02 0.08-2.12 0 0 0.67-0.21 2.2 0.82 0.64-0.18 1.32-0.27 2-0.27 0.68 0 1.36 0.09 2 0.27 1.53-1.04 2.2-0.82 2.2-0.82 0.44 1.1 0.16 1.92 0.08 2.12 0.51 0.56 0.82 1.27 0.82 2.15 0 3.07-1.87 3.75-3.65 3.95 0.29 0.25 0.54 0.73 0.54 1.48 0 1.07-0.01 1.93-0.01 2.2 0 0.21 0.15 0.46 0.55 0.38C13.71 14.53 16 11.53 16 8 16 3.58 12.42 0 8 0z"></path>
  </svg>;

// The store will injected into the React context.
// To get it back, components must be wrapped with : connect()(Component)
export default class extends React.Component {
  render() {
    return (
      <div style={STYLE_APP}>
        <h1 style={STYLE_TITLE}>Never forget your daily <a style={{verticalAlign: 'middle'}} title="https://github.com/chtefi/scrum-daily" target="_blank" href="https://github.com/chtefi/scrum-daily"><GitHub /></a></h1>
        <Provider store={store}>
          <div>
            <Daily />
            { !isProduction && <DevTools /> }
          </div>
        </Provider>
      </div>
    );
  }
}
