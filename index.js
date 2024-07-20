const WebSocket = require("ws");
const express = require("express");

const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

//Handle Web Socket Connection
wss.on("connection", function connection(ws) {
  
  ws.on("message", function incoming(message) {
    const msg = JSON.parse(message);
    switch (msg.event) {
      case "connected":
        console.log(`A new call has connected.`);
        break;
      case "start":
        console.log(`Starting Media Stream ${msg.streamSid}`);
        break;
      case "media":
        console.log(`Receiving Audio...`);
        break;
      case "stop":
        console.log(`Call Has Ended`);
        break;
    }
  });

  console.log("New Connection Initiated");
})

//Handle HTTP Request
app.get("/", (req, res) => res.send("Hello World"));

app.post("/", async (req, res) => {

  res.set("Content-Type", "text/xml");
  res.send(
    `<Response>
      <Start>
        <Stream url='wss://${req.headers.host}' />
      </Start>
      <Say>
        Start speaking to see your audio transcribed in the console.
      </Say>
      <Pause length='30' />
    </Response>`
  );

});

//Start server
console.log("Listening at Port 8080");
server.listen(8080);