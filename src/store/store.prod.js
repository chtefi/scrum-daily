import { createStore } from 'redux'
import createReducer from '../reducers';

const DEFAULT_STATE = {
  users: [
    { id: 1, name: 'Oswald Cobblepot', photo: 'https://randomuser.me/api/portraits/thumb/men/92.jpg', tasks: [ { id: 1, text: 'Trying to make the state works', cdate: '2016-01-27', ddate: '2016-02-01' }, { id: 2, text: 'Trying to find which background-color fits', cdate: '2016-02-01', ddate: '2016-02-03' } ]},
    { id: 2, name: 'Butch Gilzean', photo: 'https://randomuser.me/api/portraits/thumb/men/91.jpg', tasks: [ { id: 3, text: 'Refactor the whole project', cdate: '2016-02-01', ddate: '2016-02-03' }, { id: 4, text: 'Sending some emails', cdate: '2016-02-01', ddate: null } ]},
    { id: 3, name: 'Fish Mooney', photo: 'https://randomuser.me/api/portraits/thumb/men/90.jpg', tasks: [ { id: 5, text: 'Do some big data', cdate: '2016-02-04', ddate: null }, { id: 6, text: 'Create a new JS framework', cdate: '2016-02-02', ddate: null } ]},
  ],
  weeks: {}
};

export default function configureStore() {
  const store = createStore(createReducer(), DEFAULT_STATE);
  store.asyncReducers = {};
  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
