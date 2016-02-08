import { combineReducers } from 'redux';

import users from './usersReducer.js';
import weeks from './weeksReducer.js';

export default function(asyncReducers) {
  return combineReducers({
    users,
    weeks,
    ...asyncReducers
  });
}
