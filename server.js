const express = require("express");
const getMessage = require("./controllers/chat.js");

const app = express();
const PORT = 5000;
const HOST =
  process.env.NODE_ENV?.trim() === "development" ? "localhost" : "0.0.0.0.";

app.use(express.json());

app.post("/api/chat", getMessage);

app.listen(PORT, HOST, () => {
  console.log(`[server]: Server is running at http://${HOST}:${PORT}`);
});
