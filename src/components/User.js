import React from 'react';
import { connect } from 'react-redux';

import { getRenameUserAction, getDeleteUserAction } from '../actions/all.js';
import { EditableText } from './EditableText.js';


const STYLE_IMAGE = { height: 32, marginRight: 10, verticalAlign: 'middle' };
const STYLE_BUTTON = { border: 0, cursor: 'pointer', padding: 0, height: 16, width: 16, color: '#888', background: 'none', float: 'right' };

//
// Pure component
// 
export class User extends React.Component {
  render() {
    const { id, name, photo, onUserNameChanged, onDeleteUser } = this.props;

    return (
      <header>
        <img src={"http://www.sheffield.com/wp-content/uploads/2013/06/placeholder.png" || photo} style={STYLE_IMAGE} />
        <EditableText text={name} onTextChanged={(name) => onUserNameChanged(id, name)} />
        <button style={STYLE_BUTTON} onClick={() => onDeleteUser(id)}><i className="fa fa-times"></i></button>
      </header>
    );
  }
}
User.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  onUserNameChanged: React.PropTypes.func.isRequired,
  onDeleteUser: React.PropTypes.func.isRequired,
};

//
// Connected component
// 

const mapStateToProps = (state, props) => ({
  id: props.id,
  name: props.name,
  photo: props.photo,
});
const dispatchToProps = (dispatch) => ({
  onUserNameChanged: (userId, name) => dispatch(getRenameUserAction(userId, name)),
  onDeleteUser: (userId) => dispatch(getDeleteUserAction(userId)),
});
export default connect(mapStateToProps, dispatchToProps)(User);
