import { ADD_USER, CREATE_TASK } from '../actions/types.js';

const DEFAULT_DAILY_STATE = {
  users: [
    { name: 'JC', tasks: [ { text: 'todo', cdate: '2015-12-12', ddate: null }, { text: 'dunno', cdate: '2017-12-12', ddate: null } ]},
    { name: 'JR', tasks: [ { text: 'here', cdate: '2015-12-12', ddate: null }, { text: 'that', cdate: '2017-12-12', ddate: null } ]}
  ]
};

let lastUserId = 1;
const createNewUser = ({ name }) => ({ id: lastUserId++, name, tasks: [] });
const createNewTask = () => ({ text: 'new task', cdate: new Date().toISOString(), ddate: null });

const mapOnlyFiltered = (filter, mapper) => array => array.map(item => filter(item) ? mapper(item) : item)
const addTaskToUser = (userId) => mapOnlyFiltered((user) => user.id === userId, (user) => ({
  ...user,
  tasks: user.tasks.concat(createNewTask())
}));

export default (state = DEFAULT_DAILY_STATE, action) =>
  action.type === ADD_USER ? { ...state, users: state.users.concat(createNewUser(action.name)) } :
  action.type === CREATE_TASK ? { ...state, users: addTaskToUser(action.userId)(state.users) } :
  state;
