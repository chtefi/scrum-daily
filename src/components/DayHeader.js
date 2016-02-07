import React from 'react';
import moment from 'moment';

//
// Pure component
//

const STYLE_HEADER = { fontWeight: 'bold', fontSize: 18, padding: '10px 0' }

// TODO(sd): function component syntax ?
export class DayHeader extends React.Component {
  render() {
    const { date } = this.props;
    return (
      <header style={STYLE_HEADER}>{moment(date).format('MMM DD | dddd')}</header>
    );
  }
}
DayHeader.propTypes = {
  date: React.PropTypes.string.isRequired,
};


