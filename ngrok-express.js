// # Server code modification to include a route for reading directory contents

// # Import required modules
const fs = require("fs").promises; // For reading directory contents asynchronously
const express = require("express");
const ngrok = require("@ngrok/ngrok");
const app = express();
let url = "not set";

// Existing route
app.get("/", (req, res) => {
  res.send(`Hello Ngrok! URL: ${url}`);
});

// New route to read and return the contents of a specified directory
app.get("/read-directory", async (req, res) => {
  const directoryPath = req.query.path; // Get directory path from query parameters
  try {
    const files = await fs.readdir(directoryPath); // Read directory contents
    res.json({ success: true, files }); // Return directory contents as JSON
  } catch (error) {
    res.status(500).json({ success: false, message: error.message }); // Handle errors
  }
});

async function setup() {
  // Existing setup code with minor adjustments if necessary
  const session = await new ngrok.SessionBuilder()
    .authtoken("1XfbLiKsqgywn04jRcenK6Ilyc7_7zNzMMzDrRumGy6zb8JqG")
    .metadata("Online in One Line")
    .connect();

  const listener = await session.httpEndpoint().listen();
  const socket = await ngrok.listen(app, listener);
  console.log(`Ingress established at: ${listener.url()}`);
  url = listener.url();
  console.log(`Express listening on: ${socket.address()}`);

  // Listen on a fixed port, adjust if needed
  app.listen(3000, () => console.log("Express server listening on port 3000"));
}

setup();

// # Note: Replace "YOUR_NGROK_AUTH_TOKEN" with your actual ngrok auth token or use an environment variable.
// # This code adds a new endpoint to read and return the contents of a specified directory through the Express server.
// # Ensure your server's firewall and ngrok configurations allow requests to this new endpoint for it to work correctly.
