// Set Up Server
const express = require('express');
const app = express()
const todoRouter = require("./routes/route")

require("./db/connect") // Connect to MongoDb

app.get("/", (req, res) =>{
    res.send("Hello World")
})

// Middlewares
app.use(express.json())
app.use("/todo", todoRouter)

app.listen(5000, () => {
    console.log(`Server is running PORT 6000`);
})