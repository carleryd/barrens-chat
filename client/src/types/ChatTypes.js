//@flow
export const UserType = "USER_MESSAGE";
export const SystemType = "SYSTEM_MESSAGE";
export type ChatType = typeof UserType | typeof SystemType;

export type UserContent = {
  userName: string,
  text: string,
};

export type SystemContent = {
  info: string,
};

export type ChatContent =
  UserContent |
  SystemContent;

export type MessageType = {
  type: ChatType,
  content: ChatContent,
};
