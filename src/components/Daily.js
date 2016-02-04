import React from 'react';
import { connect } from 'react-redux'

import User from './User.js';

//
// Pure component
//

const STYLE_LIST = { display: 'flex', flexWrap: 'wrap', margin: 0, padding: 0 };
const STYLE_USER = { listStyleType: 'none', margin: 5 };

// helper fn
const createUser = (props) => <li key={props.id} style={STYLE_USER}><User {...props} /></li>

export class Daily extends React.Component {
  static propTypes = {
    users: React.PropTypes.array.isRequired
  };

  render() {
    const { users } = this.props;

    return (
      <div>
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
