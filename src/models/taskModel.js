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
  status: {
    type: String,
    enum: ["Open", "Close"],
  },
});

// Instance Method
taskSchema.methods = {
  activeTask: function () {
    return mongoose.model("Task").find({ status: "Open" });
  },
  closeTask: function (cb) {
    return mongoose.model("Task").find({ status: "Close" }, cb);
  },
};

// Static Method
taskSchema.statics = {
  findWithJS: function () {
    return this.find({ title: /js/i });
  },
};

// Query Helper
taskSchema.query = {
  findByTitle: function (title) {
    return this.find({ title: new RegExp(title, "i") });
  },
};

module.exports = new mongoose.model("Task", taskSchema);
