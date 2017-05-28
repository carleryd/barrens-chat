//@flow
import React, { Component } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import type { MessageType } from "../types/ChatTypes";

type State = {
  messages: Array<MessageType>,
};
type Props = {};

class Chat extends Component {
  state: State
  props: Props
  constructor(props: Props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  addMessage = (message: MessageType) => {
    this.setState({
      messages: this.state.messages.concat([message]),
    });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          maxWidth: 500,
          height: "60%",
          maxHeight: 600,
        }}
      >
        <ChatMessages
          style={{
            flexGrow: 1,
            borderWidth: 1,
            borderBottomWidth: 0,
            borderColor: "rgb(204, 204, 204)",
            borderStyle: "solid",
            padding: 10,
          }}
          messages={this.state.messages}
        />
        <ChatInput
          onSubmit={this.addMessage}
        />
      </div>
    );
  }
}

export default Chat;
