import { CREATE_USER, CREATE_TASK, DO_TASK, UNDO_TASK, RENAME_TASK, RENAME_USER } from './types.js';

const getCreateUserAction = (name) => ({ type: CREATE_USER, name });
const getCreateTaskAction = (userId) => ({ type: CREATE_TASK, userId });
const getDoTaskAction = (userId, taskId, yyyymmdd) => ({ type: DO_TASK, userId, taskId, yyyymmdd });
const getUndoTaskAction = (userId, taskId) => ({ type: UNDO_TASK, userId, taskId });
const getRenameTaskAction = (userId, taskId, text) => ({ type: RENAME_TASK, userId, taskId, text });
const getRenameUserAction = (userId, name) => ({ type: RENAME_USER, userId, name });

export {
  getCreateUserAction,
  getCreateTaskAction,
  getDoTaskAction,
  getUndoTaskAction,
  getRenameTaskAction,
  getRenameUserAction,
};
