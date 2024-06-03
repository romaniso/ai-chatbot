const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const getMessage = require("./controllers/chat.js");

const app = express();

const PORT = 5000;
const HOST =
  process.env.NODE_ENV?.trim() === "development" ? "localhost" : "0.0.0.0.";

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.post("/api/chat", getMessage);

app.listen(PORT, HOST, () => {
  console.log(`[server]: Server is running at http://${HOST}:${PORT}`);
});
