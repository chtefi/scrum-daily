import find from 'lodash/find';

import * as _ from '../actions/types.js';

const NEW_USER_NAME = 'New User';
const NEW_TASK_NAME = 'New Task';

// [
//  { id: 1, name: 'JC', tasks: [
//    { id: 1, text: 'Trying to make the state works', cdate: '2016-01-27', ddate: '2016-02-01' }, ..
//  ] },
//  { ... }
// ]

const createNewUser = (maxUserId) => ({ id: maxUserId + 1, name: NEW_USER_NAME, tasks: [] });
const createNewTask = (yyyymmdd, maxTaskId) => ({ id: maxTaskId + 1, text: NEW_TASK_NAME, cdate: yyyymmdd, ddate: null });

const mapOnlyFiltered = (filter, mapper) => (array) => array.map(item => filter(item) ? mapper(item) : item)
const addTaskToUser = (userId, yyyymmdd) => (tasks) => {
  const maxTaskId = getMaxTaskId(tasks);
  return mapOnlyFiltered(
    (user) => user.id === userId,
    (user) => ({ ...user, tasks: user.tasks.concat(createNewTask(yyyymmdd, maxTaskId)) })
  )(tasks);
};

// generic pure function to get the max of a nested property in arrays of arrays
const getMaxNestedProperty =
  (childArrayProperty, childProperty) =>
    (array) =>
      array.reduce((max, item) =>
        Math.max(item[childArrayProperty].reduce((max, subItem) =>
          Math.max(subItem[childProperty], max), 0), max), 0);

const getMaxTaskId = getMaxNestedProperty('tasks', 'id');

const renameUser = (userId, name) => mapOnlyFiltered(
  (user) => user.id === userId,
  (user) => ({ ...user, name })
);
const getMaxUserId = (users) => users.reduce((max, user) => Math.max(user.id, max), 0);

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

const deleteUser = (userId) => (users) => users.filter(user => user.id !== userId);

export default function (state = {}, action) {
  return action.type === _.CREATE_USER ? state.concat(createNewUser(getMaxUserId(state))) :
  action.type === _.DELETE_USER ? deleteUser(action.userId)(state) :
  action.type === _.CREATE_TASK ? addTaskToUser(action.userId, action.yyyymmdd)(state) :
  action.type === _.RENAME_USER ? renameUser(action.userId, action.name)(state) :
  action.type === _.DO_TASK     ? changeTaskStatus(action.taskId, action.yyyymmdd, 'ddate')(state) :
  action.type === _.UNDO_TASK   ? changeTaskStatus(action.taskId, null, 'ddate')(state) :
  action.type === _.RENAME_TASK ? changeTaskStatus(action.taskId, action.text, 'text')(state) :
  action.type === _.DELETE_TASK ? deleteTask(action.taskId)(state) :
  state;
}
