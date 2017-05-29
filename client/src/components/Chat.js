//@flow
import React, { Component } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import Login from "./Login";
import {
  SystemType,
} from "../types/ChatTypes";
import type {
  MessageType
} from "../types/ChatTypes";
import {
  SocketTextMessage,
} from "../types/SocketTypes";
import type {
  SocketMessage,
} from "../types/SocketTypes";

type State = {
  messages: Array<MessageType>,
  username: ?string,
};
type Props = {
  websocket: Object,
};

class Chat extends Component {
  state: State
  props: Props
  constructor(props: Props) {
    super(props);

    this.state = {
      messages: [],
      username: null,
    };

    this.props.websocket.addEventListener("message", (e: Object) => {
      // The data is simply the message that we're sending back
      const newJSONObject = JSON.parse(e.data);
      const newJSONData = newJSONObject;
      console.log("received new data", newJSONData);
      switch (newJSONData.type) {
        case "TEXT_MESSAGE":
          {
            const newMessage = newJSONData.data;
            this.setState({
              messages: this.state.messages.concat(newMessage),
            });
          }
          break;
        case "USER_CONNECTIONS":
          break;
        default:
          {
            console.error("Received invalid socket MESSAGE_TYPE");
          }
      }
    });
  }

  addMessage = (message: MessageType) => {
    const socketMessage = {
      type: "TEXT_MESSAGE",
      data: message,
    };
    const JSONSocketObject = JSON.stringify(socketMessage);
    this.props.websocket.send(JSONSocketObject);
  }

  onUsernamePicked = (username: string) => {
    const newMessage: MessageType = {
      type: SystemType,
      content: {
        info: `${username} has joined the chat!`,
      },
    };
    const socketMessage: SocketMessage = {
      type: SocketTextMessage,
      data: newMessage,
    };
    const JSONSocketObject = JSON.stringify(socketMessage);
    this.props.websocket.send(JSONSocketObject);

    this.setState({
      username: username,
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
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            borderWidth: "1px 1px 1px",
            borderBottomWidth: this.state.username != null ? 0 : 1,
            borderColor: "rgb(204, 204, 204)",
            borderStyle: "solid",
            padding: 10,
          }}
        >
          { this.state.username != null
              ? <ChatMessages
                messages={this.state.messages}
              />
              : <Login
                onUsernamePicked={this.onUsernamePicked}
              />
            }
        </div>
        { this.state.username != null
            ? <ChatInput
              onSubmit={this.addMessage}
              username={this.state.username}
            />
            : null
        }
      </div>
    );
  }
}

export default Chat;
