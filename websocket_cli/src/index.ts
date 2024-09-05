import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

// established the http connection to client to server --> 1st task

const server = http.createServer(function(request: any, response: any) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});

const wss = new WebSocketServer({ server });

let count = 0;
// after extablished http server convert to websocket connecton (WSS) --> 2nd task
wss.on('connection', function connection(ws) {

// if any error happen --> 3rd task
  ws.on('error', console.error);
 
// if the msg come then this --> 4th task
  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  
  console.log("server connected", ++count);
  
// as soon as the user connect say hello to the user --> final task
  ws.send('Hello! Message From Server!!');
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

