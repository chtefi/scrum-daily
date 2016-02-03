import { ADD_USER, CREATE_TASK } from './types.js';

const getAddUserAction = (name) => ({ type: ADD_USER, name });
const getCreateTaskAction = (userId) => ({ type: CREATE_TASK, userId });

export {
  getAddUserAction,
  getCreateTaskAction
};
