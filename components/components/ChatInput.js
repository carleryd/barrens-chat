//@flow
import React, { Component } from "react";
import type {
  UserTextData,
} from "../types/ClientMessage";
import type {
  User,
} from "../types/User";

type State = {
  messageText: string,
};
type Props = {
  style?: Object,
  onSubmit: (message: UserTextData) => void,
  user: ?User,
};

class ChatInput extends Component {
  state: State
  props: Props
  constructor(props: Props) {
    super(props);

    this.state = {
      messageText: "",
    };
  }

  updateMessage = (e: Object) => {
    this.setState({
      messageText: e.target.value,
    });
  }

  handleSubmit = (e: Object) => {
    e.preventDefault();
    if (this.props.user != null && this.props.user.id != null) {
      const newChatMessage: UserTextData = {
        id: this.props.user.id,
        username: this.props.user.username,
        text: this.state.messageText,
      };
      this.props.onSubmit(newChatMessage);
      this.setState({
        messageText: "",
      });
    } else {
      console.error("User without id trying to post message");
    }
  }

  render() {
    return (
      <div style={this.props.style}>
        <form onSubmit={this.handleSubmit}>
          <div style={{ display: "flex" }}>
            <div className="input-group">
              <input
                style={{ borderRadius: 0 }}
                autoFocus={true}
                className="form-control"
                value={this.state.messageText}
                onChange={this.updateMessage}
              />
              <span className="input-group-btn">
                <button
                  style={{ borderRadius: 0 }}
                  className="btn btn-default"
                >
                  Send
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ChatInput;
