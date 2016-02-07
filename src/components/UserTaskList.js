import React from 'react';
import { connect } from 'react-redux';

import { getCreateTaskAction } from '../actions/all.js';
import UserTask from './UserTask.js';

const STYLE_TASK_LIST = { margin: 0, padding: 0, listStyleType: 'none' };
const STYLE_BUTTON = { border: 0, cursor: 'pointer', padding: 0, color: '#444', background: 'none' };

//
// Pure component
//

// TODO(sd): pure function component syntax ?
export class UserTaskList extends React.Component {
  render() {
    const { userId, yyyymmdd, tasks, onCreateTask } = this.props;
    return (
      <div>
        <div style={{overflow: 'auto'}}>
          <button style={STYLE_BUTTON} onClick={() => onCreateTask(userId, yyyymmdd)}><i className="fa fa-plus"></i></button>
        </div>
        <ul className="tasks" style={STYLE_TASK_LIST}>
          {tasks.map(task => <UserTask key={task.id} userId={userId} yyyymmdd={yyyymmdd} task={task} />)}
        </ul>
      </div>
    );
  }
}
UserTaskList.propTypes = {
  userId: React.PropTypes.number.isRequired,
  yyyymmdd: React.PropTypes.string.isRequired,
  tasks: React.PropTypes.array.isRequired,  
  onCreateTask: React.PropTypes.func.isRequired,
};

//
// Connected component
// 

const mapStateToProps = null; 
const mapDispatchToProps = (dispatch) => ({
  onCreateTask: (userId, yyyymmdd) => dispatch(getCreateTaskAction(userId, yyyymmdd)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserTaskList);
