const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const connectDB = require("./config/db");

const colors = require("colors");

// db connection
connectDB();
// app
const app = require("./app");
const http = require("http");

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(
    `server is listening on ${process.env.NODE_ENV} PORT ${PORT}`.yellow.bold
  )
);
