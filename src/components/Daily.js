import React from 'react';
import { connect } from 'react-redux';

import spanTasksByDay from '../tools/spanTasksByDay.js';
import groupByWeeks from '../tools/groupByWeeks.js';
import { getCreateUserAction, getToggleWeekVisibility } from '../actions/all.js';

import User from './User.js';
import Day from './Day.js';

//
// Pure component
//

const STYLE_DAY_LIST = { listStyleType: 'none', margin: 0, padding: 0, display: 'inline-block' };
const STYLE_USER_LIST = { listStyleType: 'none', margin: 0, padding: 0, display: 'flex' };
const STYLE_BUTTON = { margin: '10px 0' };
const STYLE_USER_ITEM = { paddingBottom: 10, fontWeight: 800, minWidth: 250, maxWidth: 250, padding: 10, background: 'rgba(0,0,0,0.2)' };
const STYLE_WEEK = { fontWeight: 'bold', fontSize: 24, padding: 10, marginTop: 50 };

const createWeekDays = (n, days, isExpanded, toggleWeekVisibility) =>
  <li key={n}>
    <header style={STYLE_WEEK}>Week {n} <button onClick={() => toggleWeekVisibility(n)}>{isExpanded ? '-' : '+'}</button></header>
    { isExpanded && <ul className="days" style={STYLE_DAY_LIST}>{days.map(createDay)}</ul> }
  </li>;

const createDay = (dayProps) =>
  <li key={dayProps.date}>
    <Day {...dayProps} />
  </li>;

const createUser = (userProps) =>
  <li key={userProps.id} style={STYLE_USER_ITEM}>
    <User {...userProps} />
  </li>;

export class Daily extends React.Component {
  render() {
    const { users, days, weeksVisibility, onCreateUserClick, onToggleWeekVisibility } = this.props;
    const weeks = groupByWeeks(days);

    return (
      <div>
        <button style={STYLE_BUTTON} onClick={() => onCreateUserClick()}>Add a user</button>
        <ul className="users" style={STYLE_USER_LIST}>
          {users.map(createUser)}
        </ul>
        <ul className="weeks">
          {weeks.map(week => createWeekDays(week.n, week.days, weeksVisibility[week.n] === undefined ? true : weeksVisibility[week.n], onToggleWeekVisibility))}
        </ul>
      </div>
    );
  }
}
Daily.propTypes = {
  users: React.PropTypes.array.isRequired,
  days: React.PropTypes.array.isRequired,
  weeksVisibility: React.PropTypes.object.isRequired,
  onCreateUserClick: React.PropTypes.func.isRequired,
  onToggleWeekVisibility: React.PropTypes.func.isRequired,
};

//
// Connected component
// 

const mapStateToProps = (state) => ({
  users: state.users,
  weeksVisibility: state.weeks,
  days: spanTasksByDay(state.users)
});
const mapDispatchToProps = (dispatch) => ({
  onCreateUserClick: () => dispatch(getCreateUserAction()),
  onToggleWeekVisibility: (weekNumber) => dispatch(getToggleWeekVisibility(weekNumber)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Daily);
