//@flow
import React, { Component } from "react";
import Chat from "./components/Chat";
import Users from "./components/Users";
import {
  ALMOST_BLACK,
} from "./utils/colors";
import {
  UserText,
  UserConnected,
  UserDisconnected,
  UsersOnline,
  ConnectionEstablished,
} from "./types/ClientMessage";
import type {
  UserTextData,
  UserConnectedData,
  UsersOnlineData,
  UserDisconnectedData,
} from "./types/ClientMessage";
import type {
  ServerMessageType,
} from "./types/ServerMessage";
import {
  UserPickedName,
} from "./types/ServerMessage";
import type {
  SocketMessage,
} from "./types/SocketTypes";
import type {
  User,
} from "./types/User";

type State = {
  user: ?User,
  users: Array<UserConnectedData>,
  chatMessages: Array<UserTextData>,
  websocket: Object,
};
type Props = {
};
class App extends Component {
  state: State
  props: Props
  constructor(props: Props) {
    super(props);

    this.state = {
      user: null,
      users: [],
      chatMessages: [],
      websocket: new WebSocket('ws://localhost:4000', 'echo-protocol'),
    };


    this.state.websocket.addEventListener("message", (e: Object) => {
      // The data is simply the message that we're sending back
      const message = JSON.parse(e.data);
      console.log("INCOMING MESSAGE", message);
      const messageType = message.type;
      const messageData = message.data;
      switch (messageType) {
        case UserText:
          {
            // Send to Chat which then relays it to ChatMessages.
            console.log("UserText");
            this.setState({
              chatMessages: this.state.chatMessages.concat(messageData),
            });
          }
          break;
        case UserConnected:
          {
            // Send to Users, needed for increasing users online.
            const userConnected: UserConnectedData = messageData;
            this.setState({
              users: this.state.users.concat([ userConnected ]),
            });
          }
          break;
        case UserDisconnected:
          {
            // Send to Users, needed for reducing users online.
            const userDisconnected: UserDisconnectedData = messageData;
            const newUsers = this.state.users.filter((user) => user.id !== userDisconnected.id);
            this.setState({
              users: newUsers,
            });
          }
          break;
        case UsersOnline:
          {
            const usersOnline: UsersOnlineData = messageData;
            this.setState({
              users: usersOnline.users,
            });
          }
          break;
        case ConnectionEstablished:
          {
            console.log("Connection established", messageData);
            this.setState({
              user: {
                id: messageData.userId,
              },
            });
            // Send to Chat, needed when picking name.
          }
          break;
      }
    });
  }

  onUsernamePicked = (username: string) => {
    console.log("LOL", username, this.state);
    this.setState({
      user: {
        ...this.state.user,
        username: username,
      }
    });

    if (this.state.user != null && this.state.user.id != null) {
      const socketMessage: SocketMessage = {
        type: UserPickedName,
        data: {
          id: this.state.user.id,
          username: username,
        },
      };
      const JSONSocketMessage = JSON.stringify(socketMessage);
      this.state.websocket.send(JSONSocketMessage);
    } else {
      // TODO: Handle case
    }
  }

  onSubmitMessage = (message: UserTextData) => {
    console.log("add message", message);
    const socketMessage: SocketMessage = {
      type: UserText,
      data: message,
    };
    const JSONSocketMessage = JSON.stringify(socketMessage);
    this.state.websocket.send(JSONSocketMessage);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          width: "100%",
          backgroundImage: `url("http://wallpapercave.com/wp/soj54yS.jpg")`,
          backgroundSize: "cover",
        }}
      >
        <h1
          style={{
            fontFamily: "cursive",
            marginBottom: 0,
            color: ALMOST_BLACK,
          }}
        >
          Barrens Chat
        </h1>
        <i style={{ color: ALMOST_BLACK }}>"Where is Mankrik's wife?"</i>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "15%",
            }}
          ></div>
          <Chat
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              maxWidth: 500,
              height: "60%",
              maxHeight: 600,
              backgroundColor: ALMOST_BLACK,
            }}
            user={this.state.user}
            messages={this.state.chatMessages}
            onUsernamePicked={this.onUsernamePicked}
            onSubmitMessage={this.onSubmitMessage}
          />
          <Users
            style={{
              backgroundColor: "rgba(32, 32, 32, 0.5)",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "rgb(204, 204, 204)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "15%",
              height: "60%",
              minWidth: 100,
              padding: 0,
            }}
            users={this.state.users}
          />
        </div>
      </div>
    );
  }
}

export default App;
