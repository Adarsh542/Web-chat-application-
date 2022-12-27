const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const connectSocket = require("./controllers/socket");
require("dotenv").config();
const NotFound = require("./middleware/404");
const asyncWrapper = require("./middleware/asyncWrapper");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const cors = require("cors");
const sample = require("./routes/sample");
const colors = require("colors");
// middleware

// app.use(express.static("./public"));
// app.use(express.json());

app.use(cors());

// routes
app.use("/sample", sample);
// app.use("/api/v1/tasks", tasks);

app.use(errorHandler);
app.use(NotFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const con = await connectDB();
    console.log(`MongoDB connected: ${con.connection.host}`.cyan.underline);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`.green.bold)
    );
  } catch (error) {
    console.log(error, red.bold);
    process.exit();
  }
};

connectSocket(server);

start();
