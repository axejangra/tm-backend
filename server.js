const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Task = require('./models/Task')
require('dotenv').config()
const DATABASE = process.env.DATABASE;

const { Schema } = mongoose;

const app = express();


app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(DATABASE)}
  console.log("connected to mongodb success");



// api routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({ title, description });
  await newTask.save();
  res.json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params.id;
  const { title, description } = req.body;
  await Task.findByIdAndUpdate(id, { title, description });
  res.json({ message: 'Task updated successfully' });
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params.id;
      await Task.findByIdAndRemove(id);
      res.json({ message: 'Task deleted successfully' });
    
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting a task' });
  }
});

// Start the server
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
