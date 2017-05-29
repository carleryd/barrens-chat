//@flow
import React, { Component } from "react";
import type { MessageType } from "../types/ChatTypes";

type State = {
  messageText: string,
};
type Props = {
  style?: Object,
  onSubmit: (message: MessageType) => void,
  username: string,
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
    const newUserMessage = {
      userName: this.props.username,
      text: this.state.messageText,
    };
    const newMessage = {
      type: "USER_MESSAGE",
      content: newUserMessage,
    };
    this.props.onSubmit(newMessage);
    this.setState({
      messageText: "",
    });
  }

  render() {
    return (
      <div style={this.props.style}>
        <form onSubmit={this.handleSubmit}>
          <div style={{ display: "flex" }}>
            <div className="input-group">
              <input
                style={{ borderRadius: 0 }}
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
