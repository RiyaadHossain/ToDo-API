// Set Up Server
const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const todoRouter = require("./routes/todoHandler"); // Get Router - Todo
const userRouter = require("./routes/userHandler"); // Get Router - User

require("./db/connect"); // Connect to MongoDb

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Middlewares
app.use(express.json());
app.use("/todo", todoRouter);
app.use("/user", userRouter);

app.listen(5000, () => {
  console.log(`Server is running on PORT 6000.`);
});
