//@flow
import React from "react";
import {
  UserText,
} from "../types/ClientMessage";
import type {
  UserTextData,
} from "../types/ClientMessage";

type Input = {
  messages: Array<UserTextData>,
  style?: Object,
};

const ChatMessages = ({ messages, style }: Input) => {
  const renderUserTextMessage = (content: UserTextContent, i: number) => {
    return <p
      key={`message-${i}`}
      style={{ color: "white" }}
    >
      <b>{content.username}: </b>{content.text}
    </p>;
  };
  // const renderUserInfoMessage = (content: UserInfoContent, i: number) => {
  //   return <p
  //     key={`message-${i}`}
  //     style={{ color: "white" }}
  //   >
  //     <i><b>{content.username}</b> has joined the chat!</i>
  //   </p>;
  // };
  return (
    <div style={style}>
      {messages.map((message, i) => {
        // let messageType = message.type;

        console.log("render user message", message);
        return renderUserTextMessage(message, i);
      })}
    </div>
  );
};

export default ChatMessages;
