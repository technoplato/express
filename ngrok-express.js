const express = require("express");
const ngrok = require("@ngrok/ngrok");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Ngrok!");
});

async function setup() {
  // create session
  const session = await new ngrok.SessionBuilder()
    // .authtokenFromEnv()
    .authtoken("1XfbLiKsqgywn04jRcenK6Ilyc7_7zNzMMzDrRumGy6zb8JqG")
    .metadata("Online in One Line")
    .connect();
  // create listener
  const listener = await session
    .httpEndpoint()
    // .allowCidr("0.0.0.0/0")
    // .oauth("google")
    // .requestHeader("X-Req-Yup", "true")
    .listen();
  // link listener to app
  const socket = await ngrok.listen(app, listener);
  console.log(`Ingress established at: ${listener.url()}`);
  console.log(`Express listening on: ${socket.address()}`);
}

setup();
