//@flow
import http from "http";
import express from "express";
import websocket from "./websocket";

// Remove console log in production mode
if(process.env.NODE_ENV == "production") {
  // $FlowFixMe
  console.log = () => {}; 
}

if (typeof(PhusionPassenger) != 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

const app = express();
app.use(express.static("public"));

/**
 * server listen on 4000 needed for WebSockets to run on that port.
 * This port is then used by client to communicate over WebSocket.
 */
const server: Object = http.createServer(app);

if (typeof(PhusionPassenger) != 'undefined') {
  server.listen('passenger');
} else {
  server.listen(process.env.PORT || 4000, () => {});
}


const WebSocketServer = require("websocket").server;
const wsServer = new WebSocketServer({
    httpServer: server
});

websocket.init(wsServer);
