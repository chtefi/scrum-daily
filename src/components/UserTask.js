import React from 'react';
import { connect } from 'react-redux';

import { EditableText } from './EditableText.js';
import { getCreateTaskAction, getDoTaskAction, getUndoTaskAction, getRenameTaskAction, getDeleteTaskAction } from '../actions/all.js';

import Styles from '../css/UserTask.css';


//
// Pure component
//

export class UserTask extends React.Component {
  render() {
    const { /*userId, */task, yyyymmdd, onCheckedTask, onRenamedTask, /*onCreateTask,*/ onDeleteTask } = this.props;
    return (
      <li className={Styles.UserTask}>
        <div>
          <button className="check" onClick={() => onCheckedTask(task.id, yyyymmdd, task.done)}>
            <i className={"fa " + (task.done ? "fa-check-square-o" : "fa-square-o")}></i>
          </button>
        </div>
        <div style={{flex: 1}}>
          <EditableText style={task.done ? { textDecoration: 'line-through'} : null} text={task.text}
                        onTextChanged={(text) => onRenamedTask(task.id, text)}
                        onEnter={() => {}} />
          { task.span > 1 ? <span className="span"> ({task.span}d)</span> : '' /* \u00A0 is the &nbps; */}
          <button className="delete" onClick={() => onDeleteTask(task.id)}><i className="fa fa-times"></i></button>
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
