var http = require("http");
var server = http.createServer(function(request, response) {});


server.listen(4000, function() {
    console.log((new Date()) + " Server is listening on port 4000");
});


const notifyUsersChanged = (clientList) => {
  // Let all connected clients that a new client has joined
  console.log("Notify user changes", clientList.length);
  clientList.forEach((client) => {
    const connectInfo = {
      type: "USER_CONNECTIONS",
      data: clientList.length,
    };
    client.connection.sendUTF(JSON.stringify(connectInfo));
  });
};

var WebSocketServer = require("websocket").server;
wsServer = new WebSocketServer({
    httpServer: server
});

let count = 0;
let clients = [];

wsServer.on("request", function(r){
  // Accept connection, needed before we can do anything
  var connection = r.accept("echo-protocol", r.origin);
  // Code here to run on connection
  // Specific id for this client & increment count
  let id = count++;
  // Store the connection method so we can loop through & contact all clients
  const newClient = {
    id: id,
    connection: connection,
  };
  clients = clients.concat(newClient);
  console.log((new Date()) + " Connection accepted [" + id + "]");

  notifyUsersChanged(clients);

  // Create event listener
  connection.on("message", function(message) {
    // The string message that was sent to us
    var msgString = message.utf8Data;
    console.log("node websocket message", msgString);

    // Loop through all clients
    clients.forEach((client) => {
      // Send a message to the client with the message
      client.connection.sendUTF(msgString);
    });
  });

  connection.on("close", function(reasonCode, description) {
    clients = clients.filter((client) => client.id !== id);
    notifyUsersChanged(clients);
    console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
  });
});

