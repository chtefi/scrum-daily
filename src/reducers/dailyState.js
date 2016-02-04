import { CREATE_USER, CREATE_TASK, DO_TASK, UNDO_TASK } from '../actions/types.js';

const DEFAULT_DAILY_STATE = {
  users: [
    { id: 1, name: 'JC', tasks: [ { id: 1, text: 'todo', cdate: '2016-02-01', ddate: '2016-02-01' }, { id: 2, text: 'dunno', cdate: '2016-02-01', ddate: null } ]},
    { id: 2, name: 'JR', tasks: [ { id: 3, text: 'here', cdate: '2016-02-01', ddate: '2016-02-03' }, { id: 4, text: 'that', cdate: '2016-02-01', ddate: null } ]}
  ]
};

let lastUserId = 10;
let lastTaskId = 10;
const createNewUser = ({ name }) => ({ id: lastUserId++, name, tasks: [] });
const createNewTask = () => ({ id: lastTaskId++, text: 'new task', cdate: new Date().toISOString().slice(0,10), ddate: null });

const mapOnlyFiltered = (filter, mapper) => (array) => array.map(item => filter(item) ? mapper(item) : item)
const addTaskToUser = (userId) => mapOnlyFiltered(
  (user) => user.id === userId,
  (user) => ({
    ...user,
    tasks: user.tasks.concat(createNewTask())
  })
);

const changeTaskStatus = (userId, taskId, yyyymmddd) => mapOnlyFiltered(
  (user) => user.id === userId,
  (user) => ({
    ...user,
    tasks: mapOnlyFiltered(
      (task) => task.id === taskId,
      (task) => ({ ...task, ddate: yyyymmddd })
    )(user.tasks)
}));

export default (state = DEFAULT_DAILY_STATE, action) =>
  action.type === CREATE_USER ? { ...state, users: state.users.concat(createNewUser(action.name)) } :
  action.type === CREATE_TASK ? { ...state, users: addTaskToUser(action.userId)(state.users) } :
  action.type === DO_TASK ?     { ...state, users: changeTaskStatus(action.userId, action.taskId, action.yyyymmdd)(state.users) } :
  action.type === UNDO_TASK ?   { ...state, users: changeTaskStatus(action.userId, action.taskId, null)(state.users) } :
  state;
