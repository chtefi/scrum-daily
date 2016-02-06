import moment from 'moment';

// [
//  { id: 1, text: 'todo', cdate: '2016-01-20', ddate: '2016-02-01' },
//  { id: 2, text: 'dunno', cdate: '2016-02-01', ddate: '2016-02-03' }
// ]
// =>
// {
//  "2016-01-20": [ ... ]
//  "2016-01-21": [ ... ]
//  "2016-02-01": [ ... ]
//  "2016-02-02": [ ... ] <= until now()
// }

// TODO(sd): remove the keys usage ? and pass as a prop in an object ?

const isPostWeekEnd = (date) => isWeekEnd(moment(date).add(-1, 'day'));
export { isPostWeekEnd };

const isWeekEnd = (date) => date.day() === 6 || date.day() === 0;
const getNextWorkingDay = (date) => { do { date = date.add(1, 'day'); } while (isWeekEnd(date)); return date; }
const getKey = (date) => date.format('YYYY-MM-DD');
const addGroupForDay = (obj, date) => obj[getKey(date)] = [];
const getMinDate = (tasks) => tasks.reduce((minDate, task) => minDate.isAfter(moment(task.cdate)) ? moment(task.cdate) : minDate, moment());

export default (tasks) => {
  const today = moment();
  const minDate = getMinDate(tasks);

  // create every days from minDate to today
  let processingDate = minDate;
  const tasksByDay = {};
  while (processingDate.isSameOrBefore(today, 'day')) {
    addGroupForDay(tasksByDay, processingDate);
    processingDate = getNextWorkingDay(processingDate);
  }

  // fill each day with tasks that could span across multiple days
  tasks.forEach(({ id, cdate, ddate, text }) => {
    const creationDate = moment(cdate);
    const doneDate = ddate ? moment(ddate) : null; // a task can be not finished yet
    let processingDate = creationDate;
    
    do {
      const task = { id, text, done: false };
      const key = getKey(processingDate);
      tasksByDay[key].push(task); // omg
      processingDate = getNextWorkingDay(processingDate);
      if (doneDate && doneDate.isBefore(processingDate)) {
        task.done = true; // omg (the last reference is mutated)
        break;
      }
      // otherwise it loops until today
    } while (processingDate.isBefore(moment()));
  });



  return tasksByDay
};
