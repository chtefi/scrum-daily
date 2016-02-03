import { ADD_USER, CREATE_TASK } from '../actions/types.js';

const DEFAULT_DAILY_STATE = {
  users: [
    { id: 1, name: 'JC', tasks: [ { text: 'todo', cdate: '2016-02-01', ddate: '2016-02-01' }, { text: 'dunno', cdate: '2016-02-01', ddate: null } ]},
    { id: 2, name: 'JR', tasks: [ { text: 'here', cdate: '2016-02-01', ddate: '2016-02-03' }, { text: 'that', cdate: '2016-02-01', ddate: null } ]}
  ]
};

let lastUserId = 1;
const createNewUser = ({ name }) => ({ id: lastUserId++, name, tasks: [] });
const createNewTask = () => ({ text: 'new task', cdate: new Date().toISOString().slice(0,10), ddate: null });

const mapOnlyFiltered = (filter, mapper) => array => array.map(item => filter(item) ? mapper(item) : item)
const addTaskToUser = (userId) => mapOnlyFiltered((user) => user.id === userId, (user) => ({
  ...user,
  tasks: user.tasks.concat(createNewTask())
}));

export default (state = DEFAULT_DAILY_STATE, action) =>
  action.type === ADD_USER ? { ...state, users: state.users.concat(createNewUser(action.name)) } :
  action.type === CREATE_TASK ? { ...state, users: addTaskToUser(action.userId)(state.users) } :
  state;
