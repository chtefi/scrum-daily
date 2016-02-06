import React from 'react';
import { connect } from 'react-redux';
import spanTasksByDay, { isPostWeekEnd } from '../tools/spanTasksByDay.js';
import moment from 'moment';

import { getCreateTaskAction, getDoTaskAction, getUndoTaskAction, getRenameTaskAction, getRenameUserAction } from '../actions/all.js';
import { EditableText } from './EditableText.js';

const STYLE_CONTAINER = { background: 'white', width: 300, padding: 10, border: '1px solid rgba(0,0,0,.2)', borderRadius: 5, boxShadow: '3px 3px 10px rgba(0,0,0,.1)' };
const STYLE_UL = { listStyle: 'none', padding: 0 };
const STYLE_GROUP = (height, isPostWeekEnd) => ({ paddingTop: 10, paddingBottom: 10, borderTop: '1px solid rgba(0,0,0,0.2)', minHeight: height, borderBottom: (isPostWeekEnd ? '20px solid orange' : '') });
const STYLE_DATE = { paddingBottom: 10, fontWeight: 600 };
const STYLE_USER = { paddingBottom: 10, fontWeight: 800 };
const STYLE_BUTTON = { float: 'right' };

const createGroup = (userId, date, tasks, height, onClickTaskCheckbox, onRenamedTask) => (<div key={date} style={STYLE_GROUP(height, isPostWeekEnd(date))}>
    <header style={STYLE_DATE}>{moment(date).format('MMM DD | dddd')}</header>
    { tasks.map(t => <li key={t.id}>
                        <input type="checkbox" checked={t.done} onChange={() => onClickTaskCheckbox(userId, t.id, date, t.done)} />
                        <EditableText style={t.done ? { textDecoration: 'line-through'} : null} text={t.text} onTextChanged={(text) => onRenamedTask(userId, t.id, text)} />
                     </li>) }
  </div>);

//
// Pure component
// 
export class User extends React.Component {
  render() {
    const { id, name, tasks, onCreateTaskClick, onClickTaskCheckbox, onRenamedTask, onUserNameChanged } = this.props;

    const tasksByDay = spanTasksByDay(tasks);
    const HEIGHT = 100; // TODO(sd): compute dynamic max height

    return (
      <div style={STYLE_CONTAINER}>
        <header style={STYLE_USER}><EditableText text={name} onTextChanged={(name) => onUserNameChanged(id, name)} /><button style={STYLE_BUTTON} onClick={() => onCreateTaskClick(id)}>Add task</button></header>
        <ul style={STYLE_UL}>
          { Object.keys(tasksByDay).reverse().map(key => createGroup(id, key, tasksByDay[key], HEIGHT, onClickTaskCheckbox, onRenamedTask) ) }
        </ul>
      </div>
    );
  }
}
User.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  tasks: React.PropTypes.array.isRequired,
  onCreateTaskClick: React.PropTypes.func.isRequired,
  onClickTaskCheckbox: React.PropTypes.func.isRequired,
  onRenamedTask: React.PropTypes.func.isRequired
};

//
// Connected component
// 

const mapStateToProps = (state, props) => ({ id: props.id, name: props.name, tasks: props.tasks });
const dispatchToProps = (dispatch) => ({
  onCreateTaskClick: (id) => dispatch(getCreateTaskAction(id)),
  onClickTaskCheckbox: (userId, taskId, yyyymmdd, checked) => dispatch((checked ? getUndoTaskAction : getDoTaskAction)(userId, taskId, yyyymmdd)),
  onRenamedTask: (userId, taskId, text) => dispatch(getRenameTaskAction(userId, taskId, text)),
  onUserNameChanged: (userId, name) => dispatch(getRenameUserAction(userId, name)),
});
export default connect(mapStateToProps, dispatchToProps)(User);
