const express = require("express");
const app = new express();
const port = 3001;
const mongoose = require("mongoose");
const cors = require("cors");
var fs = require("fs");
var morgan = require("morgan");
var path = require("path");

const libRoute = require("./route/libraryRoute");
const authRoute = require("./route/AuthRoute");
const empRoute = require("./route/employeeRoute");
const roleRoute = require("./route/roleRoute");
const userRoute = require("./route/userRoute");
const logRoute = require("./route/logRoute");
const { errorHandler } = require("./middlewares/errorHandler");

// Middleware
app.use(cors());
app.use(express.json());
app.use(errorHandler);

//Routes
app.use("/lib", libRoute);
app.use("/auth", authRoute);
app.use("/emp", empRoute);
app.use("/role", roleRoute);
app.use("/user", userRoute);
app.use("/logs", logRoute);

// Create a write stream in append mode
const logStream = fs.createWriteStream("./logs/access.log", { flags: "a" });
app.set("trust proxy", true);
// Define a custom JSON format for logging
morgan.token("json", (req, res) => {
  const username = req.user ? req.user["username"] : null;
  const userRole = req.user ? req.user["role"].name : null;
  return JSON.stringify({
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    responseTime: res.responseTime,
    date: new Date().toISOString(),
    user: username,
    role: userRole,
    ip: req.ip,
  });
});

// Use Morgan to log requests in JSON format
app.use(morgan(":json", { stream: logStream }));

//Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/chmDb")
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(port, () => {
  console.log("Server is running on a port ", port);
});

app.get("/ping", (req, res) => {
  res.send("PONG");
});
