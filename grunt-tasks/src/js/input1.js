const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

// Define Task Schema
const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todoApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

io.on("connection", (socket) => {
  console.log("New user connected!");

  // Add Task
  socket.on("addTask", async (taskText) => {
    const newTask = new Task({ text: taskText });
    await newTask.save();
    io.emit("taskAdded", newTask); // Broadcast new task
  });

  // Delete Task
  socket.on("deleteTask", async (taskId) => {
    await Task.findByIdAndDelete(taskId);
    io.emit("taskDeleted", taskId); // Broadcast deleted task
  });

  // Update Task
  socket.on("updateTask", async ({ taskId, newText }) => {
    await Task.findByIdAndUpdate(taskId, { text: newText });
    io.emit("taskUpdated", { taskId, newText }); // Broadcast updated task
  });
});

server.listen(3000, () => console.log("🚀 Server running on port 3000"));
