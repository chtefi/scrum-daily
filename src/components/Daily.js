import React from 'react';
import { connect } from 'react-redux';

import { getCreateUserAction } from '../actions/all.js';

import User from './User.js';

//
// Pure component
//

const STYLE_LIST = { display: 'flex', flexWrap: 'wrap', margin: 0, padding: 0 };
const STYLE_USER = { listStyleType: 'none', marginRight: 10 };
const STYLE_BUTTON = { margin: '10px 0' };

// helper fn
const createUser = (props) => <li key={props.id} style={STYLE_USER}><User {...props} /></li>

export class Daily extends React.Component {
  render() {
    const { users, onCreateUserClick } = this.props;

    return (
      <div>
        <button style={STYLE_BUTTON} onClick={() => onCreateUserClick()}>Add a user</button>
        <ul style={STYLE_LIST}>
          {users.map(createUser)}
        </ul>
      </div>
    );
  }
}
Daily.propTypes = {
  users: React.PropTypes.array.isRequired,
  onCreateUserClick: React.PropTypes.func.isRequired,
};

//
// Connected component
// 

const mapStateToProps = (state) => ({ users: state.users });
const mapDispatchToProps = (dispatch) => ({
  onCreateUserClick: () => dispatch(getCreateUserAction())
});
export default connect(mapStateToProps, mapDispatchToProps)(Daily);
