//@flow
export const UserPickedName = "USER_PICKED_NAME";
export type ServerMessageType =
  typeof UserPickedName;
export type UserPickedNameData = {
  id: number,
  username: string,
};
export type ServerMessageData =
  UserPickedNameData;
