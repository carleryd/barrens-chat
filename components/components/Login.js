//@flow
import React, { Component } from "react";

type State = {
  username: string,
};
type Props = {
  onUsernamePicked: (username: string) => void,
};

class Login extends Component {
  state: State
  props: Props
  constructor(props: Props) {
    super(props);

    this.state = {
      username: "",
    };
  }

  handleSubmit = (e: Event) => {
    e.preventDefault();
    if (this.state.username.length > 0) {
      this.props.onUsernamePicked(this.state.username);
    } else {
      // TODO: Handle case where invalid username
    }
  }

  updateUsername = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      const newUsername: string = e.target.value;
      this.setState({ username: newUsername });
    } else {
      console.error("Bad input event"); 
    }
  }

  render() {
    return (
      <form
        style={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={this.handleSubmit}
      >
        <input
          style={{
            borderRadius: 3,
            width: "50%",
            textAlign: "center",
            marginTop: 30,
            marginBottom: 10,
          }}
          placeholder={"Pick a username"}
          className="form-control"
          onChange={this.updateUsername}
        />
        <button
          style={{
            borderRadius: 5,
            borderColor: "white",
            backgroundColor: "#4CAF50",
            color: "white",
          }}
          className="btn btn-default"
        >
          Join!
        </button>
      </form>
    );
  }
}

export default Login;
