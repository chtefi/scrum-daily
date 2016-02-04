import React from 'react';
import { connect } from 'react-redux';
import spanTasksByDay from '../tools/spanTasksByDay.js';

import { getCreateTaskAction, getDoTaskAction, getUndoTaskAction } from '../actions/all.js';

const STYLE_CONTAINER = { background: 'white', width: 300, padding: 10, border: '1px solid rgba(0,0,0,.2)', borderRadius: 5, boxShadow: '3px 3px 10px rgba(0,0,0,.1)' };
const STYLE_UL = { listStyle: 'none', padding: 0 };
const STYLE_GROUP = (height) => ({ paddingTop: 10, paddingBottom: 10, borderTop: '1px solid rgba(0,0,0,.5)', minHeight: height });
const DATE_STYLE = { padding: 10, fontWeight: 600 };
const STYLE_USER = { padding: 10, fontWeight: 800 };
const STYLE_BUTTON = { float: 'right' };

const createGroup = (userId, date, tasks, height, onClickTaskCheckbox) => (<div style={STYLE_GROUP(height)}>
    <header style={DATE_STYLE}>{date}</header>
    { tasks.map(t => <li><label><input type="checkbox" checked={t.done} onChange={() => onClickTaskCheckbox(userId, t.id, date, t.done)} /> {t.text}</label></li>) }
  </div>);

//
// Pure component
// 
export class User extends React.Component {
  constructor() {
    super();
  }
  static propTypes = {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    tasks: React.PropTypes.array.isRequired
  };
  render() {
    const { id, name, tasks, onCreateTaskClick, onClickTaskCheckbox } = this.props;

    const tasksByDay = spanTasksByDay(tasks);
    const HEIGHT = 100; // TODO(sd): compute dynamic max height

    return (
      <div style={STYLE_CONTAINER}>
        <header style={STYLE_USER}>{name} <button style={STYLE_BUTTON} onClick={() => onCreateTaskClick(id)}>Add task</button></header>
        <ul style={STYLE_UL}>
          { Object.keys(tasksByDay).map(key => createGroup(id, key, tasksByDay[key], HEIGHT, onClickTaskCheckbox) ) }
        </ul>
      </div>
    );
  }
}


//
// Connected component
// 

const mapStateToProps = (state, props) => ({ id: props.id, name: props.name, tasks: props.tasks });
const dispatchToProps = (dispatch) => ({
  onCreateTaskClick: (id) => dispatch(getCreateTaskAction(id)),
  onClickTaskCheckbox: (userId, taskId, yyyymmdd, checked) => dispatch((checked ? getUndoTaskAction : getDoTaskAction)(userId, taskId, yyyymmdd))
});
export default connect(mapStateToProps, dispatchToProps)(User);
