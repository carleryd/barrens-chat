//@flow
import React, { Component } from "react";

type State = {
  connectedUsers: number,
};
type Props = {
  style: Object,
  websocket: Object,
};
class Users extends Component {
  state: State
  props: Props
  constructor(props: Props) {
    super(props);

    this.state = {
      connectedUsers: 0,
    };

    this.props.websocket.addEventListener("message", (e: Object) => {
      // The data is simply the message that we're sending back
      const newJSONObject = JSON.parse(e.data);
      const newJSONData = newJSONObject;
      switch (newJSONData.type) {
        case "TEXT_MESSAGE":
          break;
        case "USER_CONNECTIONS":
          {
            this.setState({
              connectedUsers: newJSONData.data,
            });
          }
          break;
        default:
          {
            console.error("Received invalid socket MESSAGE_TYPE");
          }
      }
    });
  }

  render() {
    return (
      <div style={this.props.style}>
        <h3>Online</h3>
        There are {this.state.connectedUsers} users online
      </div>
    );
  }
}

export default Users;
