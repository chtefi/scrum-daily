import React from 'react';
import { connect } from 'react-redux';

import User from './User.js';
import { getCreateUserAction } from '../actions/all.js';

const STYLE_USER_LIST = { listStyleType: 'none', margin: 0, padding: 0, display: 'flex' };
const STYLE_USER_ITEM = { fontWeight: 800, minWidth: 250, maxWidth: 250, padding: 10, textAlign: 'center', overflow: 'hidden' };
const STYLE_CREATE_USER = { minWidth: 250, maxWidth: 250, paddingTop: 10, textAlign: 'center' }

const createUser = (userProps) =>
  <li key={userProps.id} style={STYLE_USER_ITEM}>
    <User {...userProps} />
  </li>;

export class UserList extends React.Component {
  render() {
    const { users, onCreateUserClick } = this.props;

    return (
      <ul className="users" style={STYLE_USER_LIST}>
        {users.map(createUser)}
        <li key="createUser" style={STYLE_CREATE_USER}>
          <button className="button" onClick={() => onCreateUserClick()}>Add a user</button>
        </li>
      </ul>
    );
  }
}
UserList.PropTypes = {
  users: React.PropTypes.array.required,
  onCreateUserClick: React.PropTypes.func.required,
};


//
// Connected component
// 

const mapStateToProps = (state) => ({
  users: state.users,
});
const mapDispatchToProps = (dispatch) => ({
  onCreateUserClick: () => dispatch(getCreateUserAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
