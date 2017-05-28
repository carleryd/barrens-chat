import React, { Component } from "react";
import Chat from "./components/Chat";

class App extends Component {
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
        <Chat />
      </div>
    );
  }
}

export default App;
