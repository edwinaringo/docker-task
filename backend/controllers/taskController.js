const { Task, Category } = require('../models');

exports.createTask = async (req, res) => {
    try {
      const { title, description, priority, dueDate, status, progress, recurring, attachments, categoryId } = req.body;
      const task = await Task.create({
        title,
        description,
        priority,
        dueDate,
        status,
        progress,
        recurring,
        attachments,
        categoryId,
        userId: req.user.id,
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  };
  

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id }, include: ['category'] });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id; 
    const task = await Task.findOne({
      where: { id: taskId, userId: req.user.id }, 
      include: ['category'],
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    res.status(500).json({ error: 'Failed to fetch the task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, categoryId, status } = req.body;
    const task = await Task.findByPk(id);

    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;
    task.categoryId = categoryId || task.categoryId;
    task.status = status || task.status;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ error: 'Task not found or unauthorized' });
    }

    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

exports.getCompletedTasks = async (req, res) => {
  try {
    const completedTasks = await Task.findAll({
      where: {
        userId: req.user.id,
        status: 'Completed',
      },
      include: ['category'],
    });
    res.json(completedTasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch completed tasks' });
  }
};
