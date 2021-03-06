import React from 'react';
import { connect } from 'react-redux';

import spanTasksByDay from '../tools/spanTasksByDay.js';
import groupByWeeks from '../tools/groupByWeeks.js';
import { getToggleWeekVisibility } from '../actions/all.js';

import Day from './Day.js';
import UserList from './UserList.js';

//
// Pure component
//

const STYLE_DAY_LIST = { listStyleType: 'none', margin: 0, padding: 0, display: 'inline-block' };
const STYLE_BUTTON_PLAIN = { border: 0, cursor: 'pointer', padding: 0, color: '#888', background: 'none', fontSize: 20, marginLeft: 10 };
const STYLE_WEEK_HEADER = { fontWeight: 'bold', fontSize: 24, padding: '10px 0' };
const STYLE_WEEK = (isExpanded) => ({ marginBottom: (isExpanded ? 40 : 0) });

const createWeekDays = (n, days, isExpanded, toggleWeekVisibility) =>
  <li key={n} style={STYLE_WEEK(isExpanded)}>
    <header style={STYLE_WEEK_HEADER}><i style={{color: '#888'}} className="fa fa-calendar"></i> Week {n} 
      <button style={STYLE_BUTTON_PLAIN} onClick={() => toggleWeekVisibility(n)}>
        {isExpanded ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}
      </button>
    </header>
    { isExpanded && <UserList /> }
    { isExpanded && <ul className="days" style={STYLE_DAY_LIST}>{days.map(createDay)}</ul> }
  </li>;

const createDay = (dayProps) =>
  <li key={dayProps.date}>
    <Day {...dayProps} />
  </li>;

export class Daily extends React.Component {
  render() {
    const { days, weeksVisibility, onToggleWeekVisibility } = this.props;
    const weeks = groupByWeeks(days);

    return (
      <div>
        <ul className="weeks">
          {weeks.map(week => createWeekDays(week.n, week.days, weeksVisibility[week.n] === undefined ? true : weeksVisibility[week.n], onToggleWeekVisibility))}
        </ul>
      </div>
    );
  }
}
Daily.propTypes = {
  days: React.PropTypes.array.isRequired,
  weeksVisibility: React.PropTypes.object.isRequired,
  onToggleWeekVisibility: React.PropTypes.func.isRequired,
};

//
// Connected component
// 

const mapStateToProps = (state) => ({
  weeksVisibility: state.weeks,
  days: spanTasksByDay(state.users)
});
const mapDispatchToProps = (dispatch) => ({
  onToggleWeekVisibility: (weekNumber) => dispatch(getToggleWeekVisibility(weekNumber)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Daily);
