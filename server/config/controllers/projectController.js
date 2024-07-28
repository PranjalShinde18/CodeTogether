const Project = require('../../models/Project');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// Create a new project

exports.createProject = async (req, res) => {
    try {
        const { name, description, project_id, password } = req.body;
        const creatorId = req.user.id;

        if (!name || !project_id || !password) {
            return res.status(400).json({ error: 'Project name, project_id, and password are required' });
        }

        // Fetch the creator's username
        const creator = await User.findById(creatorId);
        if (!creator) {
            return res.status(404).json({ error: 'Creator not found' });
        }

        // Create new project
        const newProject = new Project({
            name,
            description,
            project_id,
            password,
            creator: creatorId,
            members: [
                {
                    userId: creatorId,
                    joinedAt: new Date(),
                    role: 'creator',
                    username: creator.username // Add the creator's username here
                }
            ]
        });

        // Save project to database
        const savedProject = await newProject.save();

        // Update user's project list
        await User.findByIdAndUpdate(
            creatorId,
            { $push: { projects: { projectId: savedProject._id, role: 'creator' } } },
            { new: true }
        );

        res.status(201).json({ project: savedProject });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Error creating project' });
    }
};


exports.joinProject = async (req, res) => {
    try {
        const { project_id, password } = req.body;
        const userId = req.user && req.user.id;

        if (!project_id || !password) {
            return res.status(400).json({ error: 'Project ID and password are required' });
        }

        // Check if the project exists
        const project = await Project.findOne({ project_id });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, project.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Check if the user is already a member of the project
        const isMember = project.members.some(member => member.userId.toString() === userId);
        if (isMember) {
            return res.status(400).json({ error: 'User is already a member of this project' });
        }

        // Get the username of the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add user to the project's members
        const member = { userId, joinedAt: new Date(), role: 'member', username: user.username };
        console.log('Member to be added:', member); // Debugging statement
        project.members.push(member);
        await project.save();

        // Update the user's project list
        await User.findByIdAndUpdate(
            userId,
            { $push: { projects: { projectId: project._id, role: 'member' } } },
            { new: true }
        );

        res.status(200).json({ message: 'Successfully joined the project' });
    } catch (error) {
        console.error('Error joining project:', error);
        res.status(500).json({ error: 'Error joining project' });
    }
};


// Assign a task to a member
exports.assignTask = async (req, res) => {
    try {
        const { description, assignedTo, deadline } = req.body;
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        if (project.creator.toString() !== req.user.id) {
            return res.status(403).json({ error: 'You are not authorized to assign tasks for this project' });
        }

        // Ensure assigned user is a member of the project
        const member = project.members.find(member => member.username === assignedTo);
        if (!member) {
            return res.status(400).json({ error: 'Assigned user is not a member of the project' });
        }

        const task = {
            description,
            assignedTo: member.userId,
            assignedUsername: member.username,
            deadline: new Date(deadline)
        };
        project.tasks.push(task);
        await project.save();

        res.status(200).json(project); // Return the entire project object
    } catch (error) {
        console.error('Error assigning task:', error);
        res.status(500).json({ error: 'Error assigning task' });
    }
};




//  Change task Status

exports.changeTaskStatus = async (req, res) => {
    try {
        const { projectId, taskId } = req.params;
        const { status } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const task = project.tasks.id(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.status = status;
        await project.save();

        res.status(200).json(task);
    } catch (error) {
        console.error('Error changing task status:', error);
        res.status(500).json({ error: 'Error changing task status' });
    }
};






// Fetch all tasks assigned to a specific user

exports.getUserTasks = async (req, res) => {
    try {
        const userId = req.user.id; // Get the user ID from the JWT token
        console.log('Fetching tasks for user ID:', userId);

        // Find all projects where the user is a member
        const projects = await Project.find({ 'members.userId': userId });
        console.log('Found projects:', projects);

        // Collect tasks assigned to the user
        let tasks = [];
        projects.forEach(project => {
            project.tasks.forEach(task => {
                if (task.assignedTo.toString() === userId) {
                    tasks.push({
                        ...task.toObject(),
                        projectId: project._id, // Include project ID for reference
                        projectName: project.name // Optional: include project name for context
                    });
                }
            });
        });

        console.log('Tasks assigned to user:', tasks);
        res.status(200).json({ tasks });
    } catch (error) {
        console.error('Error fetching user tasks:', error);
        res.status(500).json({ error: 'Error fetching user tasks' });
    }
};

// Get all projects created by the user
exports.getCreatedProjects = async (req, res) => {
    try {
        const userId = req.user.id;
        const projects = await Project.find({ creator: userId });
        res.status(200).json({ projects });
    } catch (error) {
        console.error('Error fetching created projects:', error);
        res.status(500).json({ error: 'Error fetching created projects' });
    }
};

// Get all projects the user has joined
exports.getJoinedProjects = async (req, res) => {
    try {
        const userId = req.user.id;
        const projects = await Project.find({
            'members.userId': userId,
            'creator': { $ne: userId }
        });
        res.status(200).json({ projects });
    } catch (error) {
        console.error('Error fetching joined projects:', error);
        res.status(500).json({ error: 'Error fetching joined projects' });
    }
};

// Get all projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('creator', 'username email'); // Optionally populate creator info
        res.status(200).json({ projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Error fetching projects' });
    }
};

// Get project tasks by project ID
exports.getProjectTasks = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate('tasks.assignedTo', 'username');
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching project tasks:', error);
        res.status(500).json({ error: 'Error fetching project tasks' });
    }
};


exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate('creator members.userId');
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};