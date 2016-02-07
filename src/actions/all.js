import { CREATE_USER, CREATE_TASK, DO_TASK, UNDO_TASK, RENAME_TASK, DELETE_TASK, RENAME_USER } from './types.js';

const getCreateUserAction = () => ({ type: CREATE_USER });
const getCreateTaskAction = (userId, yyyymmdd) => ({ type: CREATE_TASK, userId, yyyymmdd });
const getDoTaskAction = (taskId, yyyymmdd) => ({ type: DO_TASK, taskId, yyyymmdd });
const getUndoTaskAction = (taskId) => ({ type: UNDO_TASK, taskId });
const getRenameTaskAction = (taskId, text) => ({ type: RENAME_TASK, taskId, text });
const getRenameUserAction = (userId, name) => ({ type: RENAME_USER, userId, name });
const getDeleteTaskAction = (taskId) => ({ type: DELETE_TASK, taskId });

export {
  getCreateUserAction,
  getCreateTaskAction,
  getDoTaskAction,
  getUndoTaskAction,
  getRenameTaskAction,
  getRenameUserAction,
  getDeleteTaskAction
};
