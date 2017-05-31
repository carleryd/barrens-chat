//@flow
import React, { Component } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import Login from "./Login";
import {
  UserText,
} from "../types/ClientMessage";
import type {
  UserTextData,
} from "../types/ClientMessage";
import type {
  SocketMessage,
} from "../types/SocketTypes";
import {
  ALMOST_BLACK,
} from "../utils/colors";
import type {
  User,
} from "../types/User";


type State = {
};
type Props = {
  user: ?User,
  messages: Array<UserTextData>,
  onUsernamePicked: (username: string) => void,
  onSubmitMessage: (message: UserTextData) => void,
};

class Chat extends Component {
  state: State
  props: Props
  constructor(props: Props) {
    super(props);

    this.state = {
    };

  }

  render() {
    const usernamePicked = this.props.user != null && this.props.user.username != null;
    console.log("usernamePicked", usernamePicked);
    return (
      <div style={this.props.style}>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            borderWidth: 1,
            borderBottomWidth: this.state.username != null ? 0 : 1,
            borderColor: "rgb(204, 204, 204)",
            borderStyle: "solid",
            padding: 10,
          }}
        >
          { usernamePicked === true
              ? <ChatMessages
                messages={this.props.messages}
              />
              : <Login
                onUsernamePicked={this.props.onUsernamePicked}
              />
            }
        </div>
        { usernamePicked === true
            ? <ChatInput
              user={this.props.user}
              onSubmit={this.props.onSubmitMessage}
            />
            : null
        }
      </div>
    );
  }
}

export default Chat;
