//@flow
import type {
  User,
} from "./Users";
export const UserText = "USER_TEXT";
export const UserConnected = "USER_CONNECTED";
export const UserDisconnected = "USER_DISCONNECTED";
export const UsersOnline = "USERS_ONLINE";
export const ConnectionEstablished = "CONNECTION_ESTABLISHED";
export type ClientMessageType =
  typeof UserText |
  typeof UserConnected |
  typeof UserDisconnected |
  typeof UsersOnline |
  typeof ConnectionEstablished;
export type UserTextData = {
  id: number,
  text: string,
};
export type UserConnectedData = {
  id: number,
  username: string,
};
export type UserDisconnectedData = {
  id: number,
};
export type UsersOnlineData = {
  users: Array<User>,
};
export type ConnectionEstablishedData = {
  userId: number,
};
export type ClientMessageData =
  UserTextData |
  UserConnectedData |
  UserDisconnectedData |
  ConnectionEstablishedData;

