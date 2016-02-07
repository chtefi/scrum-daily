import moment from 'moment';
import flatMap from 'lodash/flatMap';
import find from 'lodash/find';

// 
// from:
// [
//  { id: 1, name: 'JC', tasks: [
//    { id: 1, text: 'Trying to make the state works', cdate: '2016-01-27', ddate: '2016-02-01' }, ..
//  ] },
//  { ... }
// ]
// 
// to:
// [
//   { date: '2015-10-10', tasks: [ 
//     { userId: 1, tasks: [
//       { id: 1, text: 'todo', done: false }
//     ] },
//     { userId: 2, tasks: [ { id: 3, text: 'dunno', done: true } ] } ]
//   },
//   ...
// ]

const isPostWeekEnd = (date) => isWeekEnd(moment(date).add(-1, 'day'));
export { isPostWeekEnd };

const isWeekEnd = (date) => date.day() === 6 || date.day() === 0;
const getNextWorkingDay = (date) => { do { date = date.add(1, 'day'); } while (isWeekEnd(date)); return date; }
const getKey = (date) => date.format('YYYY-MM-DD');
const addGroupForDay = (arr, date, userIds) => arr.push({ date: getKey(date), tasks: userIds.map(id => ({ userId: id, tasks: [] })) });
const getMinDate = (tasks) => tasks.reduce((minDate, task) => minDate.isAfter(moment(task.cdate)) ? moment(task.cdate) : minDate, moment());

export default (users) => {
  const today = moment();
  const minDate = getMinDate(flatMap(users, user => user.tasks));
  const tasksByDay = [];
  const userIds = users.map(user => user.id);

  // create every days from minDate until today
  let processingDate = minDate;
  while (processingDate.isSameOrBefore(today, 'day')) {
    addGroupForDay(tasksByDay, processingDate, userIds);
    processingDate = getNextWorkingDay(processingDate);
  }

  // sorry
  // TODO(sd): build the array in reverse directly
  tasksByDay.reverse();

  // fill each day with tasks that could span across multiple days
  // TODO(sd): this is a bit complicated and not perf-friendly, at all
  // TODO(sd): cache into a (or two) Map(s) ?
  users.forEach(({ id: userId, tasks }) => {
    tasks.forEach(({ id: taskId, text, cdate, ddate }) => {
      const creationDate = moment(cdate);
      const doneDate = ddate ? moment(ddate) : null; // a task can be not finished yet

      let processingDate = creationDate;
      let currentSpan = 0;
      do {
        const task = { id: taskId, text, done: false, span: ++currentSpan };
        const key = getKey(processingDate);
        const tasksForThisDate = find(tasksByDay, byDay => byDay.date === key).tasks;
        const user = find(tasksForThisDate, t => t.userId === userId);
        user.tasks.push(task);
        processingDate = getNextWorkingDay(processingDate);
        if (doneDate && doneDate.isBefore(processingDate)) {
          task.done = true; // omg (the last reference is mutated)
          break;
        }
      } while (processingDate.isSameOrBefore(today, 'day'));
    });
  });

  return tasksByDay
};
