import React from 'react';
import { connect } from 'react-redux';

import { getRenameUserAction } from '../actions/all.js';
import { EditableText } from './EditableText.js';

//
// Pure component
// 
export class User extends React.Component {
  render() {
    const { id, name, onUserNameChanged } = this.props;

    return (
      <header>
        <EditableText text={name} onTextChanged={(name) => onUserNameChanged(id, name)} />
      </header>
    );
  }
}
User.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  onUserNameChanged: React.PropTypes.func.isRequired,
};

//
// Connected component
// 

const mapStateToProps = (state, props) => ({
  id: props.id,
  name: props.name,
});
const dispatchToProps = (dispatch) => ({
  onUserNameChanged: (userId, name) => dispatch(getRenameUserAction(userId, name)),
});
export default connect(mapStateToProps, dispatchToProps)(User);
