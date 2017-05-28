//@flow
import React from "react";
import type { MessageType } from "../types/ChatTypes";

type Input = {
  messages: Array<MessageType>,
  style: Object,
};

const ChatMessages = ({ messages, style }: Input) => {
  return (
    <div style={style}>
      {messages.map((message, i) => {
        return <p key={`message-${i}`}>
          <b>{message.userName}: </b>{message.text}
        </p>;
      })}
    </div>
  );
};

export default ChatMessages;
