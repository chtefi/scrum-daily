import find from 'lodash/find';

import { CREATE_USER, CREATE_TASK, DO_TASK, UNDO_TASK, RENAME_TASK, RENAME_USER, DELETE_TASK } from '../actions/types.js';

const NEW_USER_NAME = 'New User';
const NEW_TASK_NAME = 'New Task';

// [
//  { id: 1, name: 'JC', tasks: [
//    { id: 1, text: 'Trying to make the state works', cdate: '2016-01-27', ddate: '2016-02-01' }, ..
//  ] },
//  { ... }
// ]

let lastUserId = 10;
let lastTaskId = 10;
const createNewUser = () => ({ id: lastUserId++, name: NEW_USER_NAME, tasks: [] });
const createNewTask = (yyyymmdd) => ({ id: lastTaskId++, text: NEW_TASK_NAME, cdate: yyyymmdd, ddate: null });

const mapOnlyFiltered = (filter, mapper) => (array) => array.map(item => filter(item) ? mapper(item) : item)
const addTaskToUser = (userId, yyyymmdd) => mapOnlyFiltered(
  (user) => user.id === userId,
  (user) => ({ ...user, tasks: user.tasks.concat(createNewTask(yyyymmdd)) })
);
const renameUser = (userId, name) => mapOnlyFiltered(
  (user) => user.id === userId,
  (user) => ({ ...user, name })
);

const changeTaskStatus = (taskId, yyyymmdd, property) => mapOnlyFiltered(
  (user) => find(user, u => find(u.tasks, t => t.id === taskId) !== null),
  (user) => ({
    ...user,
    tasks: mapOnlyFiltered(
      (task) => task.id === taskId,
      (task) => ({ ...task, [property]: yyyymmdd })
    )(user.tasks)
}));
const deleteTask = (taskId) => mapOnlyFiltered(
  (user) => find(user, u => find(u.tasks, t => t.id === taskId) !== null),
  (user) => ({
    ...user,
    tasks: user.tasks.filter(task => task.id !== taskId)
}));

export default (state, action) =>
  action.type === CREATE_USER ? { ...state, users: state.users.concat(createNewUser(NEW_USER_NAME)) } :
  action.type === CREATE_TASK ? { ...state, users: addTaskToUser(action.userId, action.yyyymmdd)(state.users) } :
  action.type === RENAME_USER ? { ...state, users: renameUser(action.userId, action.name)(state.users) } :
  action.type === DO_TASK ?     { ...state, users: changeTaskStatus(action.taskId, action.yyyymmdd, 'ddate')(state.users) } :
  action.type === UNDO_TASK ?   { ...state, users: changeTaskStatus(action.taskId, null, 'ddate')(state.users) } :
  action.type === RENAME_TASK ? { ...state, users: changeTaskStatus(action.taskId, action.text, 'text')(state.users) } :
  action.type === DELETE_TASK ? { ...state, users: deleteTask(action.taskId)(state.users) } :
  state;
