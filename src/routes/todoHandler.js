const express = require("express");
const ToDo = require("../models/taskModel");
const router = express.Router();
const verifyUser = require("../../middlewares/verifyUser");
const User = require("../models/userModel");

// Get All the ToDos
router.get("/", verifyUser, async (req, res) => {
  try {
    const data = await ToDo.find().populate("user", "username");
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      error: "A Server Error Occured Here",
    });
  }
});

// Get the active ToDos - Instance Method
router.get("/active-todo", async (req, res) => {
  try {
    const todo = new ToDo();
    const data = await todo.activeTask();
    if (data) {
      res.status(200).json({
        data,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "A Server Error Occured",
    });
  }
});

// Get the close ToDos - Instance Method with Callback
router.get("/close-todo", (req, res) => {
  const todo = new ToDo();
  todo.closeTask((err, data) => {
    if (err) {
      res.status(400).json({
        error: "A Server Error Occured",
      });
    }
    if (data) {
      res.status(200).json({
        data,
      });
    }
  });
});

// Get Todos with 'JS' title - Static Method
router.get("/js", async (req, res) => {
  try {
    const data = await ToDo.findWithJS();
    if (data) {
      res.status(200).json({
        data,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "A Server Error Occured",
    });
  }
});

// Get ToDos with Title - Query Method
router.get("/by-title/:title", async (req, res) => {
  try {
    const data = await ToDo.find().findByTitle(req.params.title);
    if (data) {
      res.status(200).json({
        data,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "A Server Error Occured Here",
    });
  }
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
router.post("/", verifyUser, async (req, res) => {
  try {
    const todo = new ToDo({
      ...req.body,
      user: req.userId, // Accpet the data type as you define in the Schema
    });
    await todo.save();
    await User.updateOne({ _id: req.userId }, { $push: { todos: todo._id } });
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
