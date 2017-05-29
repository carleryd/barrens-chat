//@flow
export const SocketTextMessage = "TEXT_MESSAGE";
export type SocketMessage = {
  type: typeof SocketTextMessage,
  data: Object,
};

