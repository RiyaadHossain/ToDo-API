const express = require("express");
const ToDo = require("../models/task");
const router = express.Router();

// Get All the ToDos
router.get("/", (req, res) => {
  ToDo.find((err, data) => {
    if (err) {
      res.status(400).json({
        error: "A Server Error Occured",
      });
    } else {
      res.status(200).json({
        data,
      });
    }
  });
});

// Get a ToDo
router.get("/:id", async (req, res) => {
  try {
    const data = await ToDo.findById(req.params.id);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      error: "A Server Error Occured",
    });
  }
});

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
  ToDo.insertMany(req.body, (error) => {
    if (error) {
      res.status(400).json({
        error: "A Server Error Occured",
      });
    } else {
      res.status(200).json({ message: "ToDos are assigned successfully" });
    }
  });
});

// Put a ToDo
router.put("/:id", async (req, res) => {
  try {
    const data = await ToDo.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      error: "A Server Error Occured",
    });
  }
});

module.exports = router;
