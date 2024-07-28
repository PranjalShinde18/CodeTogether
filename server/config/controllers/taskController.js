const Task = require('../../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.find({ assignedTo: userId });
        res.status(200).json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createTask = async (req, res) => {
    try {
        const data = req.body;
        data.creator = req.user.id;
        const newTask = new Task(data);
        const response = await newTask.save();
        res.status(201).json(response);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
