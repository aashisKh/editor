const UserModel = require("./model/User");
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { initialize_socket } = require("./socket");
const { connect_to_db } = require("./database");
const { router } = require("./router");

connect_to_db()
initialize_socket(server)
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(router)

server.listen(8000);
