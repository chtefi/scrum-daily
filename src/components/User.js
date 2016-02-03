import React from 'react';
import { connect } from 'react-redux';
import groupBy from 'lodash/groupby';
import moment from 'moment';

import { getCreateTaskAction } from '../actions/all.js';

const STYLE_CONTAINER = { width: 300, padding: 10, border: '1px solid rgba(0,0,0,.2)', borderRadius: 5, background: 'rgba(0,0,0,.05)', boxShadow: '3px 3px 10px rgba(0,0,0,.1)' };
const STYLE_UL = { listStyle: 'none', padding: 0 };

const createGroup = (key, tasks) => (<div><span>{key}</span>
    { tasks.map(t => <li><label><input type="checkbox" checked={t.done} /> {t.text}</label></li>) }
  </div>);


const doSpanTasks = (tasks) => tasks.reduce((acc, task) => {
  var d = moment(task.cdate);
  var ddate = moment(task.ddate);
  var stop;
  
  do {
    var yyyymmdd = d.format('YYYY-MM-DD');
    if (!acc[yyyymmdd]) {
      acc[yyyymmdd] = [];
    }
    
    var t = { text: task.text, done: false };
    acc[yyyymmdd].push(t); // omg
    d = d.add(1, 'day');

    if (ddate.isBefore(d)) {
      t.done = true; // omg
      break;
    }

    stop = d.isBefore(moment());    
  } while (stop);

  return acc;
}, {});



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
    const { id, name, tasks, onCreateTaskClick } = this.props;

    const spanTasks = doSpanTasks(tasks);

    return (
      <div style={STYLE_CONTAINER}>
        {name} <button onClick={() => onCreateTaskClick(id)}>+</button>
        <ul style={STYLE_UL}>
          { Object.keys(spanTasks).map(key => createGroup(key, spanTasks[key]) ) }
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
