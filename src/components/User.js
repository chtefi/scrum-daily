import React from 'react';
import { connect } from 'react-redux';

import { getCreateTaskAction } from '../actions/all.js';

const STYLE_CONTAINER = { width: 300, padding: 10, border: '1px solid rgba(0,0,0,.2)', borderRadius: 5, background: 'rgba(0,0,0,.05)', boxShadow: '3px 3px 10px rgba(0,0,0,.1)' };

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
    console.log(this.props);
    const { id, name, tasks, onCreateTaskClick } = this.props;
    return (
      <div style={STYLE_CONTAINER}>
        {name} <button onClick={() => onCreateTaskClick(id)}>+</button>
        <ul>
          { tasks.map(t => <li>{t.text}</li>) }
        </ul>
      </div>
    );
  }
}


//
// Connected component
// 

const mapStateToProps = (state, props) => ({ id: props.id, name: props.name, tasks: props.tasks });
const dispatchToProps = (dispatch) => ({ onCreateTaskClick: (id) => dispatch(getCreateTaskAction(id)) });
export default connect(mapStateToProps, dispatchToProps)(User);
