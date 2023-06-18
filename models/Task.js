const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
  });
  
  const Task = mongoose.model('Task', TaskSchema);
  module.exports = Task;
