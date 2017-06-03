//@flow
export const UserTextType = "USER_TEXT";
export const UserInfoType = "USER_INFO";
export type ChatType = typeof UserTextType | typeof UserInfoType;

export type UserTextContent = {
  username: string,
  text: string,
};

export const UserConnected = "USER_CONNECTED";
export const UserDisconnected = "USER_DISCONNECTED";
export type UserInfoStatus = typeof UserConnected | typeof UserDisconnected;
export type UserInfoContent = {
  username: string,
  status: UserInfoStatus,
};

export type ChatContent =
  UserTextContent |
  UserInfoContent;

export type ChatMessage = {
  type: ChatType,
  content: ChatContent,
};
