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

const isWeekEnd = (date) => date.day() === 6 || date.day() === 0;
const getNextWorkingDay = (date) => { do { date = date.add(1, 'day'); } while (isWeekEnd(date)); return date; }
const addGroupForDay = (obj, date) => obj[date.format('YYYY-MM-DD')] = [];

export default (tasks) => {
  tasks.sort((t1, t2) => moment(t1).isAfter(t2) ? 1 : -1);

  let processingDate;

  const tasksByDay = tasks.reduce((acc, { id, cdate, ddate, text }) => {
    const creationDate = moment(cdate);
    const doneDate = ddate ? moment(ddate) : null; // a task can be not finished yet
    
    // we are going to iterate the dates, +1 day, +1 day etc. until the current date
    // ultra-ugly, the variable is declared outside to know the last value it takes
    processingDate = creationDate;
    
    // TODO(sd): omg
    
    do {
      const tasks = addGroupForDay(acc, processingDate);
      const task = { id, text, done: false };
      tasks.push(task); // omg
      processingDate = getNextWorkingDay(processingDate);

      if (doneDate && doneDate.isBefore(processingDate)) {
        task.done = true; // omg
        break;
      }

    } while (processingDate.isBefore(moment()));

    return acc;
  }, {});

  const today = moment();
  if (processingDate) {
    // fill until today if not yet    
    while (processingDate.isBefore(today)) {
      addGroupForDay(tasksByDay, processingDate);      
      processingDate = getNextWorkingDay(processingDate);      
    }
  } else if (!isWeekEnd(today)) {
    // just add today
    addGroupForDay(tasksByDay, today);
  }

  return tasksByDay
};
