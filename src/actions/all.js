import { CREATE_USER, CREATE_TASK, DO_TASK, UNDO_TASK } from './types.js';

const getCreateUserAction = (name) => ({ type: CREATE_USER, name });
const getCreateTaskAction = (userId) => ({ type: CREATE_TASK, userId });
const getDoTaskAction = (userId, taskId, yyyymmdd) => ({ type: DO_TASK, userId, taskId, yyyymmdd });
const getUndoTaskAction = (userId, taskId) => ({ type: UNDO_TASK, userId, taskId });

export {
  getCreateUserAction,
  getCreateTaskAction,
  getDoTaskAction,
  getUndoTaskAction
};
