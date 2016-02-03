import React from 'react';
import { connect } from 'react-redux'

import User from './User.js';

//
// Pure component
//

const STYLE_BOARD = { background: 'white', width: '100%' };
const STYLE_LIST = { display: 'flex', flexWrap: 'wrap', margin: 0, padding: 0 };
const STYLE_UNIT = { listStyleType: 'none', margin: 10 };

// helper fn
const createUser = (props) => <li key={props.id} style={STYLE_UNIT}><User {...props} /></li>

export class Daily extends React.Component {
  static propTypes = {
    users: React.PropTypes.array.isRequired
  };

  render() {
    const { users } = this.props;

    return (
      <div style={STYLE_BOARD}>
        <ul style={STYLE_LIST}>
          {users.map(createUser)}
        </ul>
      </div>
    );
  }
}

//
// Connected component
// 

const mapStateToProps = (state) => ({ users: state.users });
export default connect(mapStateToProps)(Daily);
