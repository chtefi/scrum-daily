import * as _ from './types.js';

export const getCreateUserAction = () => ({ type: _.CREATE_USER });
export const getDeleteUserAction = (userId) => ({ type: _.DELETE_USER, userId });
export const getCreateTaskAction = (userId, yyyymmdd) => ({ type: _.CREATE_TASK, userId, yyyymmdd });
export const getDoTaskAction = (taskId, yyyymmdd) => ({ type: _.DO_TASK, taskId, yyyymmdd });
export const getUndoTaskAction = (taskId) => ({ type: _.UNDO_TASK, taskId });
export const getRenameTaskAction = (taskId, text) => ({ type: _.RENAME_TASK, taskId, text });
export const getRenameUserAction = (userId, name) => ({ type: _.RENAME_USER, userId, name });
export const getDeleteTaskAction = (taskId) => ({ type: _.DELETE_TASK, taskId });
export const getToggleWeekVisibility = (weekNumber) => ({ type: _.TOGGLE_WEEK_VISIBILITY, weekNumber });
export const getSetWeekVisibility = (weekNumber) => ({ type: _.SET_WEEK_VISIBILITY, weekNumber });
