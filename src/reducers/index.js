import { combineReducers } from 'redux';

import users from './usersReducer.js';
import weeks from './weeksReducer.js';

export default combineReducers({
  users,
  weeks
});
