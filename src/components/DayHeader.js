import React from 'react';
import moment from 'moment';
import { DayHeader as DayHeaderClass } from '../css/DayHeader.css';

//
// Pure component
//

// TODO(sd): function component syntax ?
export class DayHeader extends React.Component {
  render() {
    const { date } = this.props;
    return (
      <header className={DayHeaderClass}>{moment(date).format('MMM DD')} <i style={{color: '#888' }} className="fa fa-angle-double-right"></i> {moment(date).format('dddd')}</header>
    );
  }
}
DayHeader.propTypes = {
  date: React.PropTypes.string.isRequired,
};


