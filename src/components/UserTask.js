import React from 'react';
import { connect } from 'react-redux';

import { EditableText } from './EditableText.js';
import { getCreateTaskAction, getDoTaskAction, getUndoTaskAction, getRenameTaskAction, getDeleteTaskAction } from '../actions/all.js';

const STYLE_TASK_LIST_ITEM = { fontSize: 14, display: 'flex' };
const STYLE_BUTTON = { border: '1px solid #ccc', cursor: 'pointer', padding: 0, width: 16, background: 'none', float: 'right' };

//
// Pure component
//

export class UserTask extends React.Component {
  render() {
    const { userId, task, yyyymmdd, onCheckedTask, onRenamedTask, onCreateTask, onDeleteTask } = this.props;
    return (
      <li style={STYLE_TASK_LIST_ITEM}>
        <div>
          <input type="checkbox" checked={task.done} onChange={() => onCheckedTask(task.id, yyyymmdd, task.done)} />
        </div>
        <div style={{flex: 1}}>
          <EditableText style={task.done ? { textDecoration: 'line-through'} : null} text={task.text} onTextChanged={(text) => onRenamedTask(task.id, text)} onEnter={() => onCreateTask(userId, yyyymmdd)} />
          { task.span > 1 ? `\u00A0(${task.span}d)` : '' /* \u00A0 is the &nbps; */}
          <button style={STYLE_BUTTON} onClick={() => onDeleteTask(task.id)}>-</button>
        </div>
      </li>
    );
  }
}
UserTask.propTypes = {
  userId: React.PropTypes.number.isRequired,
  yyyymmdd: React.PropTypes.string.isRequired,
  task: React.PropTypes.object.isRequired,
  onCreateTask: React.PropTypes.func.isRequired,
  onCheckedTask: React.PropTypes.func.isRequired,
  onRenamedTask: React.PropTypes.func.isRequired,
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
export default connect(mapStateToProps, mapDispatchToProps)(UserTask);
