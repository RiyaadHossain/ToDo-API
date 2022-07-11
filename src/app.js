// Set Up Server
const express = require('express');
const app = express()

require("./db/connect")

app.get("/", (req, res) =>{
    res.send("Hello World")
})

app.listen(6000, () => {
    console.log(`Server is running PORT 6000`);
})