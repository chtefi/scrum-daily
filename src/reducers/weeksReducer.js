import * as _ from '../actions/types.js';

// before: { 41: false, 42: true }
// > toggleWeekVisibility(42)(map)
// after:  { 41: false, 42: false }
const toggleWeekVisibility = (weekNumber) => (map) => ({ ...map, [weekNumber]: (map[weekNumber] === undefined ? false : !map[weekNumber]) });
const setWeekVisibility = (weekNumber) => (map) => ({ ...map, [weekNumber]: true });

export default (state = {}, action) =>
  action.type === _.TOGGLE_WEEK_VISIBILITY ? toggleWeekVisibility(action.weekNumber)(state) :
  action.type === _.SET_WEEK_VISIBILITY ? setWeekVisibility(action.weekNumber)(state) :
  state;
