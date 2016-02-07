import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { DayHeader } from './DayHeader.js';
import UserTaskList from './UserTaskList.js';
import { isPostWeekEnd } from '../tools/spanTasksByDay.js';

//
// Pure component
//

const STYLE_USER_TASKLIST_ITEM = { minWidth: 250, maxWidth: 250, padding: 10, marginRight: 10, background: 'white', borderRadius: 5, boxShadow: '3px 3px 10px rgba(0,0,0,.1)', border: '1px solid rgba(0,0,0,.2)' };
const STYLE_USER_TASKLIST = { margin: 0, padding: 0, listStyleType: 'none', display: 'flex' };
const STYLE_CONTAINER = (isPostWeekEnd) => ({ borderBottom: (isPostWeekEnd ? '20px solid orange' : '') });

// helper fn
const createTasksPerUser = (userId, yyyymmdd, tasks) =>
  <li key={userId} style={STYLE_USER_TASKLIST_ITEM}>
    <UserTaskList tasks={tasks} userId={userId} yyyymmdd={yyyymmdd} />
  </li>;


// date: '2015-10-10',
// tasksByUser: [
//  { userId: 1, tasks: [ { id: 1, text: 'todo', done: false }, ... ] },
//  { userId: 2, tasks: [ { id: 3, text: 'dunno', done: true }, ... ] },
// ]
// 
export class Day extends React.Component {
  render() {
    const { date, tasksByUser } = this.props;

    return (
      <div className="day" style={STYLE_CONTAINER(isPostWeekEnd(moment(date)))}>
        <DayHeader date={date} />
        { /* horizontal list by user */ }
        <ul style={STYLE_USER_TASKLIST}>
          {tasksByUser.map(tbu => createTasksPerUser(tbu.userId, date, tbu.tasks))}
        </ul>
      </div>
    );
  }
}
Day.propTypes = {
  date: React.PropTypes.string.isRequired,
  tasksByUser: React.PropTypes.array.isRequired,
};

//
// Connected component
// 

const mapStateToProps = (state, props) => ({
  date: props.date,
  tasksByUser: props.tasks,
});
const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Day);
