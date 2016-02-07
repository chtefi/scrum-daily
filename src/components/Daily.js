import React from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';
import moment from 'moment';

import spanTasksByDay from '../tools/spanTasksByDay.js';
import { getCreateUserAction } from '../actions/all.js';

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

const createWeekDays = ({ n, days }) => <li><header style={STYLE_WEEK}>Week {n}</header><ul className="days" style={STYLE_DAY_LIST}>{days.map(createDay)}</ul></li>;
const createDay = (dayProps) => <li key={dayProps.date}><Day {...dayProps} /></li>;
const createUser = (userProps) => <li key={userProps.id} style={STYLE_USER_ITEM}><User {...userProps} /></li>;

export class Daily extends React.Component {
  render() {
    const { users, days, onCreateUserClick } = this.props;

    const weeks = days.reduce((weeks, day) => {
      const weekNumber = moment(day.date).week();
      const week = find(weeks, w => w.n === weekNumber);
      if (week) {
        week.days.push(day);
      } else {
        weeks.push({ n: weekNumber, days: [ day ] });
      }
      return weeks;
    }, []);

    return (
      <div>
        <button style={STYLE_BUTTON} onClick={() => onCreateUserClick()}>Add a user</button>
        <ul className="users" style={STYLE_USER_LIST}>
          {users.map(createUser)}
        </ul>
        <ul className="weeks">
          {weeks.map(createWeekDays)}
        </ul>
      </div>
    );
  }
}
Daily.propTypes = {
  users: React.PropTypes.array.isRequired,
  days: React.PropTypes.array.isRequired,
  onCreateUserClick: React.PropTypes.func.isRequired,
};

//
// Connected component
// 

const mapStateToProps = (state) => ({
  users: state.users,
  days: spanTasksByDay(state.users)
});
const mapDispatchToProps = (dispatch) => ({
  onCreateUserClick: () => dispatch(getCreateUserAction())
});
export default connect(mapStateToProps, mapDispatchToProps)(Daily);
