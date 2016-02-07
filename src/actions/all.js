import { CREATE_USER, DELETE_USER, CREATE_TASK, DO_TASK, UNDO_TASK, RENAME_TASK, DELETE_TASK, RENAME_USER, TOGGLE_WEEK_VISIBILITY, SET_WEEK_VISIBILITY } from './types.js';

const getCreateUserAction = () => ({ type: CREATE_USER });
const getDeleteUserAction = (userId) => ({ type: DELETE_USER, userId });
const getCreateTaskAction = (userId, yyyymmdd) => ({ type: CREATE_TASK, userId, yyyymmdd });
const getDoTaskAction = (taskId, yyyymmdd) => ({ type: DO_TASK, taskId, yyyymmdd });
const getUndoTaskAction = (taskId) => ({ type: UNDO_TASK, taskId });
const getRenameTaskAction = (taskId, text) => ({ type: RENAME_TASK, taskId, text });
const getRenameUserAction = (userId, name) => ({ type: RENAME_USER, userId, name });
const getDeleteTaskAction = (taskId) => ({ type: DELETE_TASK, taskId });
const getToggleWeekVisibility = (weekNumber) => ({ type: TOGGLE_WEEK_VISIBILITY, weekNumber });
const getSetWeekVisibility = (weekNumber) => ({ type: SET_WEEK_VISIBILITY, weekNumber });

export {
  getCreateUserAction,
  getDeleteUserAction,
  getCreateTaskAction,
  getDoTaskAction,
  getUndoTaskAction,
  getRenameTaskAction,
  getRenameUserAction,
  getDeleteTaskAction,
  getToggleWeekVisibility,
  getSetWeekVisibility,
};
