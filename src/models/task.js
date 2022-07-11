const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
  stauts: {
    type: String,
    enum: ["Open", "Close"],
    default: "Open"
  }
});

module.exports = new mongoose.model("Task", taskSchema)