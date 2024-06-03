const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const getMessage = require("./controllers/chat.js");

const app = express();

const PORT = 5000;
const HOST =
  process.env.NODE_ENV?.trim() === "development" ? "localhost" : "0.0.0.0.";

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY || "default_secret_key", // Use env variable or default for dev
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Secure cookies in production
  })
);
// Enable CORS for all origins
app.use(cors());

app.post("/api/chat", getMessage);

app.listen(PORT, HOST, () => {
  console.log(`[server]: Server is running at http://${HOST}:${PORT}`);
});
