import moment from 'moment';
import find from 'lodash/find';

// days must be an array with a { date } field
const groupByWeeks = (days) => days.reduce((weeks, day) => {
  const weekNumber = moment(day.date).week();
  const week = find(weeks, w => w.n === weekNumber);
  if (week) {
    week.days.push(day);
  } else {
    weeks.push({ n: weekNumber, days: [ day ] });
  }
  return weeks;
}, []);

export default groupByWeeks;
