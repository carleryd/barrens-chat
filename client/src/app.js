//@flow
import React, { Component } from "react";
import Chat from "./components/Chat";
import Users from "./components/Users";
import VOIP from "./components/VOIP";

type State = {
  websocket: Object,
  username: string,
};
type Props = {
};
class App extends Component {
  state: State
  props: Props
  constructor(props: Props) {
    super(props);

    const ws = new WebSocket('ws://localhost:4000', 'echo-protocol');

    this.state = {
      websocket: ws,
      username: "placeholder",
    };
  }

  onUsernameChange = (username: string) => {
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
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontFamily: "cursive",
          }}
        >
          Barrens Chat
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Users
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "15%",
              minWidth: 100,
              padding: 10,
            }}
            websocket={this.state.websocket}
          />
          <Chat
            websocket={this.state.websocket}
          />
          <VOIP
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "15%",
              minWidth: 100,
              padding: 10,
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
