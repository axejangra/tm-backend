
const app = express();
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const Task = require('../models/Task')



// API routes
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
    const { id } = req.params;
    const { title, description } = req.body;
    await Task.findByIdAndUpdate(id, { title, description });
    res.json({ message: 'Task updated successfully' });
  });
  
  app.delete('/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
        await Task.findByIdAndRemove(id);
        res.json({ message: 'Task deleted successfully' });
      
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting a task' });
    }
  });