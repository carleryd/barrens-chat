//@flow
import React, { Component } from "react";

type State = {};
type Props = {
  style: Object,
};
class VOIP extends Component {
  state: State
  props: Props
  constructor(props: Props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div style={this.props.style}>
        <h3>Voice over IP</h3>
        Work in progress!
      </div>
    );
  }
}

export default VOIP;
