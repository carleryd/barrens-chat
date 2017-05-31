//@flow
import http from "http";
import type {
  SocketMessage,
  SocketMessageType,
  SocketMessageData,
} from "./src/types/SocketTypes";
import {
  UserConnected,
  UserDisconnected,
  UsersOnline,
} from "./src/types/ClientMessage";
import type {
  UserConnectedData,
  UserDisconnectedData,
  UsersOnlineData,
} from "./src/types/ClientMessage";
import type {
  User,
} from "./src/types/Users";
import { UserPickedName } from "./src/types/ServerMessage";
import { ConnectionEstablished } from "./src/types/ClientMessage";
import type { ConnectionEstablishedData } from "./src/types/ClientMessage";


type Client = {
  id: number,
  username?: string,
  connection: Object,
};

const server: Object = http.createServer(function(request, response) {});


server.listen(4000, function() {
    console.log("Server is listening on port 4000");
});


const WebSocketServer = require("websocket").server;
const wsServer = new WebSocketServer({
    httpServer: server
});

type State = {
  clients: Array<Client>,
};
let state: State = {
  clients: [],
};

const handleMessage = (
  messageString: string,
  connection: Object,
) => {
    const message = JSON.parse(messageString);
    const messageType: SocketMessageType = message.type;
    const messageData: Object = message.data;
    console.log("handleMessage", messageType);
    /**
     * Perform certain actions on messages of ServerMessageType.
     * Default case passes all unhandled ServerMessageType messages, as well as
     * all messages of ClientMessageType, to the clients.
     */
    switch (messageType) {
      case UserPickedName:
        {
          console.log("UserPickedName");
          /**
           * Here the client is created with id from server and username from client.
           * This coupling of id and username is necessary for identifying which
           * username disconnect, among other things.
           */
          state.clients = state.clients.map((client) => {
            return client.id === messageData.id
              ? {
                ...client,
                username: messageData.username,
              }
              : client;
          });
          /**
           * Inform all connected clients of the new user that has just joined the chat
           */
          const userConnectedData: UserConnectedData = {
            id: messageData.id,
            username: messageData.username,
          };
          const message: SocketMessage = {
            type: UserConnected,
            data: userConnectedData,
          };
          const messageString = JSON.stringify(message);
          console.log("sending messageString", messageString);
          state.clients.forEach((client) => {
            client.connection.sendUTF(messageString);
          });
        }
        break;
      default:
        {
          console.log("Sending message to every client", messageType, messageData);
          state.clients.forEach((client) => {
            client.connection.sendUTF(messageString);
          });
        }
    };
};

const sendUsersOnline = (connection: Object, clients: Array<Client>) => {
  const users: Array<User> = clients.map((client) => {
    return {
      id: client.id,
      username: client.username,
    };
  });
  const usersOnline: UsersOnlineData = {
    users: users,
  };
  const usersOnlineMessage = {
    type: UsersOnline,
    data: usersOnline,
  };
  const usersOnlineMessageString = JSON.stringify(usersOnlineMessage);
  connection.sendUTF(usersOnlineMessageString);
};

let count = 0;
wsServer.on("request", function(r){
  // Accept connection, needed before we can do anything
  const connection = r.accept("echo-protocol", r.origin);
  const id = count++;

  console.log("Request, lets send id to client");
  const connectMessage: ConnectionEstablishedData = {
    userId: id,
  };
  const message: SocketMessage = {
    type: ConnectionEstablished,
    data: connectMessage,
  };
  const messageString = JSON.stringify(message);
  console.log("connection message", messageString);
  connection.sendUTF(messageString);

  const newClient: Client = {
    id: id,
    connection: connection,
  };
  state.clients = state.clients.concat(newClient);

  sendUsersOnline(connection, state.clients);

  connection.on("message", function(message) {
    const messageString = message.utf8Data;
    handleMessage(messageString, connection);
  });

  connection.on("close", function(reasonCode, description) {
    state.clients = state.clients.filter((client) => client.id !== id);
    console.log("Peer " + connection.remoteAddress + " disconnected.");
    const userDisconnectedData: UserDisconnectedData = {
      id: id,
    };
    const disconnectMessage: SocketMessage = {
      type: UserDisconnected,
      data: userDisconnectedData,
    };
    const disconnectMessageString = JSON.stringify(disconnectMessage);
    console.log("CLOSING TIME", disconnectMessageString);
    state.clients.forEach((client) => {
      client.connection.sendUTF(disconnectMessageString);
    });
  });
});

