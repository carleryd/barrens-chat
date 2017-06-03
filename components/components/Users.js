//@flow
import React, { Component } from "react";
import {
  UserTextType,
  UserInfoType,
} from "../types/ChatTypes";
import type {
  User,
} from "../types/User";
import {
  GRAY,
  WHITE,
} from "../utils/colors";

type State = {
  connectedUsers: number,
};
type Props = {
  style: Object,
  users: Array<User>,
};
class Users extends Component {
  state: State
  props: Props
  constructor(props: Props) {
    super(props);

    this.state = {
      connectedUsers: 0,
    };
  }

  render() {
    return (
      <div style={this.props.style}>
        <h5 style={{ color: WHITE, marginBottom: 10, }}>Users online</h5>
        <hr
          style={{
            border: 0,
            height: 0,
            margin: 0,
            marginTop: 0,
            marginBottom: 10,
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
            backgroundColor: WHITE,
            width: "100%",
          }}
        />
        {this.props.users.map((user: User, i: number) => {
          return user.username != null ? (
            <p
              key={`user-${i}`}
              style={{ color: WHITE }}
            >
              {user.username}
            </p>
          )
          : null;
        })}
      </div>
    );
  }
}

export default Users;
