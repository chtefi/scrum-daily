import { createStore } from 'redux'
import reducer from '../reducers';
//import persistState from 'redux-localstorage';

//import logState from '../middlewares/logState.js';
//import logAction from '../middlewares/logAction.js';
//
const DEFAULT_STATE = {
  users: [
    { id: 1, name: 'Oswald Cobblepot', photo: 'https://randomuser.me/api/portraits/thumb/men/92.jpg', tasks: [ { id: 1, text: 'Trying to make the state works', cdate: '2016-01-27', ddate: '2016-02-01' }, { id: 2, text: 'Trying to find which background-color fits', cdate: '2016-02-01', ddate: '2016-02-03' } ]},
    { id: 2, name: 'Butch Gilzean', photo: 'https://randomuser.me/api/portraits/thumb/men/91.jpg', tasks: [ { id: 3, text: 'Refactor the whole project', cdate: '2016-02-01', ddate: '2016-02-03' }, { id: 4, text: 'Sending some emails', cdate: '2016-02-01', ddate: null } ]},
    { id: 3, name: 'Fish Mooney', photo: 'https://randomuser.me/api/portraits/thumb/men/90.jpg', tasks: [ { id: 5, text: 'Do some big data', cdate: '2016-02-04', ddate: null }, { id: 6, text: 'Create a new JS framework', cdate: '2016-02-02', ddate: null } ]},
  ],
  weeks: {}
};

// TODO(sd): Ultra ugly for now, must create distinct files to the stores, and for the root component
// because right now, we import the whole stuff in the production bundle : it sucks.
// https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md
//const isProduction = (process.env.NODE_ENV === 'production');
//const createPersistentStore = (isProduction ? compose(persistState())(createStore) : compose(persistState(), DevTools.instrument())(createStore));
//const createEnhancedStore = storeEnhancer(createPersistentStore);


export default function configureStore() {
  const store = createStore(reducer, DEFAULT_STATE);
  // store.asyncReducers = {};
  
  /* eslint-disable */
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    })
  }
  /* eslint-enable */

  return store;
}

// export function injectAsyncReducer(store, name, asyncReducer) {
//   store.asyncReducers[name] = reducer;
//   store.replaceReducer(createReducer(store.asyncReducers));
// }
