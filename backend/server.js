const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const todoRoutes = require("./Routes/todoRoutes");
const mongoose = require("mongoose");

app.use(bodyParser.json());
//connecting to database
mongoose.connect(
  "mongodb://127.0.0.1:27017/todos",
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

app.use("/todos", todoRoutes);

app.listen(5050, () => {
  console.log("Server in running on port 5050");
});
