const express = require("express");
const ToDo = require("../models/task");
const router = express.Router();

// Get All the ToDo
router.get("/", (req, res) => {});

// Post a Task
router.post("/", async (req, res) => {
  try {
    const todo = new ToDo(req.body);
    await todo.save();
    res.status(200).json({ message: " Task assigned successfully" });
  } catch (error) {
    res.status(400).json({
      error: "A Server Error Occured",
    });
  }
});

// Post Multiple Tasks
router.post("/tasks", (req, res) => {
  ToDo.insertMany(req.body, (error, data) => {
    if (error) {
      res.status(400).json({
        error,
      });
    } else {
      res.status(200).json({ message: "ToDos are assigned successfully" });
    }
  });
});

module.exports = router;
