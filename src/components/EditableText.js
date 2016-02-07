import React from 'react';

//
// Pure component
// 
export class EditableText extends React.Component {
  constructor(props) {
    super();
    this.state = { isRenaming: false, text: props.text };
  }
  handleChange(event) {
    this.setState({ ...this.state, text: event.target.value });
  }
  handleKeyPress(event) {
    if (event.charCode === 13) {
      this.handleEndRenaming();
      this.props.onEnter && this.props.onEnter();
    }
  }
  handleStartRenaming() {
    this.setState({ text: this.props.text, isRenaming: true });
  }
  handleEndRenaming() {
   this.setState({ ...this.state, isRenaming: false }); 
   this.props.onTextChanged && this.props.onTextChanged(this.state.text);
  }
  render() {
    const { style, text: originalText } = this.props;
    const { isRenaming, text } = this.state;

    return isRenaming
          ? <input onBlur={() => this.handleEndRenaming()} autoFocus
              onChange={(e) => this.handleChange(e)}
              onKeyPress={(e) => this.handleKeyPress(e)}
              value={text} />
          : <span style={{ cursor: 'pointer', ...style }} onClick={() => this.handleStartRenaming()}>{originalText}</span>;
  }  
}

EditableText.propTypes = {
  text: React.PropTypes.string.isRequired,
  style: React.PropTypes.object,
  onTextChanged: React.PropTypes.func,
  onEnter: React.PropTypes.func,
};
