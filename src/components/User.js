import React from 'react';
import { connect } from 'react-redux';

import { getRenameUserAction } from '../actions/all.js';
import { EditableText } from './EditableText.js';


const STYLE_IMAGE = { height: 32, marginRight: 10, verticalAlign: 'middle' };

//
// Pure component
// 
export class User extends React.Component {
  render() {
    const { id, name, photo, onUserNameChanged } = this.props;

    return (
      <header>
        <img src={"http://www.sheffield.com/wp-content/uploads/2013/06/placeholder.png" || photo} style={STYLE_IMAGE} />
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
  photo: props.photo,
});
const dispatchToProps = (dispatch) => ({
  onUserNameChanged: (userId, name) => dispatch(getRenameUserAction(userId, name)),
});
export default connect(mapStateToProps, dispatchToProps)(User);
