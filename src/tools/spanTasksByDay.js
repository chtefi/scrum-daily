import moment from 'moment';

export default (tasks) => tasks.reduce((acc, task) => {
  var creationDate = moment(task.cdate);
  var processingDate = creationDate;
  var doneDate = task.ddate ? moment(task.ddate) : null;
  var stop;
  
  // TODO(sd): omg
  
  do {
    var yyyymmdd = processingDate.format('YYYY-MM-DD');
    if (!acc[yyyymmdd]) {
      acc[yyyymmdd] = [];
    }
    
    var t = { id: task.id, text: task.text, done: false };
    acc[yyyymmdd].push(t); // omg

    do {
      processingDate = processingDate.add(1, 'day');
    } while (processingDate.day() === 6 || processingDate.day() === 0);

    if (doneDate && doneDate.isBefore(processingDate)) {
      t.done = true; // omg
      break;
    }

    stop = processingDate.isBefore(moment());    
  } while (stop);

  return acc;
}, {});
