import React from 'react';
import { connect } from 'react-redux';

import User from './User.js';

const STYLE_USER_LIST = { listStyleType: 'none', margin: 0, padding: 0, display: 'flex' };
const STYLE_USER_ITEM = { fontWeight: 800, minWidth: 250, maxWidth: 250, padding: 10, textAlign: 'center', overflow: 'hidden' };

const createUser = (userProps) =>
  <li key={userProps.id} style={STYLE_USER_ITEM}>
    <User {...userProps} />
  </li>;

export class UserList extends React.Component {
  render() {
    const { users } = this.props;

    return (
      <ul className="users" style={STYLE_USER_LIST}>
        {users.map(createUser)}
      </ul>
    );
  }
}
UserList.PropTypes = {
  users: React.PropTypes.array.required,
};


//
// Connected component
// 

const mapStateToProps = (state) => ({
  users: state.users,
});
const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
