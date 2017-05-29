//@flow
import React from "react";
import type {
  MessageType,
  UserContent,
  SystemContent,
  ChatContent,
  ChatType,
} from "../types/ChatTypes";
import {
  UserType,
  SystemType,
} from "../types/ChatTypes";

type Input = {
  messages: Array<MessageType>,
  style?: Object,
};

const ChatMessages = ({ messages, style }: Input) => {
  const renderUserMessage = (content: Object, i: number) => {
    return <p key={`message-${i}`}>
      <b>{content.userName}: </b>{content.text}
    </p>;
  };
  const renderSystemMessage = (content: Object, i: number) => {
    return <p key={`message-${i}`}>
      <i>{content.info}</i>
    </p>;
  };
  return (
    <div style={style}>
      {messages.map((message, i) => {
        switch (message.type) {
          case UserType:
            return renderUserMessage(message.content, i);
          case SystemType:
            return renderSystemMessage(message.content, i);
          default:
        }
      })}
    </div>
  );
};

export default ChatMessages;
