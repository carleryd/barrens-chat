//@flow
import type {
  ClientMessageType,
  ClientMessageData,
} from "./ClientMessage";
import type {
  ServerMessageType,
  ServerMessageData,
} from "./ServerMessage";

export type SocketMessageType =
  ClientMessageType |
  ServerMessageType;
export type SocketMessageData =
  ClientMessageData |
  ServerMessageData;
export type SocketMessage = {
  type: SocketMessageType,
  data: SocketMessageData,
};
