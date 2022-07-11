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
    const data = await ToDo.findById({ _id: req.params.id });
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
    const data = await ToDo.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      error: "A Server Error Occured",
    });
  }
});

// Delete a ToDo
router.delete("/:id", (req, res) => {
  ToDo.findByIdAndDelete({ _id: req.params.id }).exec((err, data) => {
    if (err) {
      res.status(400).json({
        error: "Sorry! the task wasn't deleted",
      });
    }
    if (data) {
      res.status(200).json({
        Message: "The todo is Deleted successfully",
      });
    }
  });
});

// Delete Multiple ToDos
router.delete("/", async (req, res) => {
  try {
    const data = await ToDo.deleteMany({ title: /coding/i });

    if (data) {
      res.status(200).json({
        message: "Todos are Deleted Successfully",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Sorry! We couldn't delete the ToDos",
    });
  }
});

module.exports = router;
