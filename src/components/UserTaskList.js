import React from 'react';
import { connect } from 'react-redux';

import { getCreateTaskAction, getDoTaskAction, getUndoTaskAction, getRenameTaskAction, getDeleteTaskAction } from '../actions/all.js';
import { EditableText } from './EditableText.js';

const STYLE_TASK_LIST = { margin: 0, padding: 0, listStyleType: 'none' };
const STYLE_TASK_LIST_ITEM = { fontSize: 14 };
const STYLE_BUTTON = { border: '1px solid #ccc', cursor: 'pointer', padding: 0, width: 16, background: 'none', float: 'right' }

const createTask = (userId, task, yyyymmdd, onCheckedTask, onRenamedTask, onCreateTask, onDeleteTask) =>
  <li key={task.id} style={STYLE_TASK_LIST_ITEM}>
    <input type="checkbox" checked={task.done} onChange={() => onCheckedTask(task.id, yyyymmdd, task.done)} />
    <EditableText style={task.done ? { textDecoration: 'line-through'} : null} text={task.text} onTextChanged={(text) => onRenamedTask(task.id, text)} onEnter={() => onCreateTask(userId, yyyymmdd)} />
    <button style={STYLE_BUTTON} onClick={() => onDeleteTask(task.id)}>-</button>
  </li>;

//
// Pure component
//

// TODO(sd): pure function component syntax ?
export class UserTaskList extends React.Component {
  render() {
    const { userId, yyyymmdd, tasks, onCheckedTask, onRenamedTask, onCreateTask, onDeleteTask } = this.props;
    return (
      <div>
        <div style={{overflow: 'auto'}}><button style={STYLE_BUTTON} onClick={() => onCreateTask(userId, yyyymmdd)}>+</button></div>
        <ul className="tasks" style={STYLE_TASK_LIST}>
          {tasks.map(task => createTask(userId, task, yyyymmdd, onCheckedTask, onRenamedTask, onCreateTask, onDeleteTask))}
        </ul>
      </div>
    );
  }
}
UserTaskList.propTypes = {
  tasks: React.PropTypes.array.isRequired,
  yyyymmdd: React.PropTypes.string.isRequired,
  userId: React.PropTypes.number.isRequired,
  onCheckedTask: React.PropTypes.func.isRequired,
  onRenamedTask: React.PropTypes.func.isRequired,
  onCreateTask: React.PropTypes.func.isRequired,
  onDeleteTask: React.PropTypes.func.isRequired,
};

//
// Connected component
// 

const mapStateToProps = null; 
const mapDispatchToProps = (dispatch) => ({
  onRenamedTask: (taskId, text) => dispatch(getRenameTaskAction(taskId, text)),  
  onCheckedTask: (taskId, yyyymmdd, checked) => dispatch((checked ? getUndoTaskAction : getDoTaskAction)(taskId, yyyymmdd)),
  onCreateTask: (userId, yyyymmdd) => dispatch(getCreateTaskAction(userId, yyyymmdd)),
  onDeleteTask: (taskId) => dispatch(getDeleteTaskAction(taskId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserTaskList);
