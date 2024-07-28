import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useParams } from 'react-router-dom';
import './Task.css';

const Task = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [user, setUser] = useState(null);
    const [newTask, setNewTask] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [membersMap, setMembersMap] = useState({});
    const [statusMap, setStatusMap] = useState({});

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const decoded = jwtDecode(token);
                setUser(decoded);

                const config = {
                    headers: { 'x-auth-token': token }
                };

                const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`, config);
                setProject(response.data);

                const membersMap = response.data.members.reduce((acc, member) => {
                    acc[member.username] = member.userId;
                    return acc;
                }, {});

                setMembersMap(membersMap);

                const statusMap = response.data.tasks.reduce((acc, task) => {
                    acc[task._id] = task.status;
                    return acc;
                }, {});

                setStatusMap(statusMap);

            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };

        if (projectId) {
            fetchProjectData();
        }
    }, [projectId]);

    const handleAssignTask = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { 'x-auth-token': token }
            };

            const selectedUser = project.members.find(member => member.username === assignedTo);
            if (!selectedUser) {
                console.error('Selected user is not found');
                return;
            }

            const response = await axios.post(
                `http://localhost:5000/api/projects/${projectId}/assign-task`,
                {
                    description: newTask,
                    assignedTo: selectedUser.username,
                    deadline: new Date().toISOString()
                },
                config
            );

            setProject(prevProject => ({
                ...prevProject,
                tasks: [...prevProject.tasks, response.data.tasks[response.data.tasks.length - 1]]
            }));

            setNewTask('');
            setAssignedTo('');
        } catch (error) {
            console.error('Error assigning task:', error);
        }
    };

    const handleChangeTaskStatus = async (taskId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { 'x-auth-token': token }
            };

            const response = await axios.patch(
                `http://localhost:5000/api/projects/${projectId}/change-task-status/${taskId}`,
                { status: newStatus },
                config
            );

            setStatusMap(prevStatusMap => ({
                ...prevStatusMap,
                [taskId]: response.data.status
            }));
        } catch (error) {
            console.error('Error changing task status:', error);
        }
    };

    if (!project) return <p>Loading...</p>;

    const isCreator = user && user.id === project.creator._id;

    const userTasks = project.tasks.filter(task => task.assignedTo.toString() === user.id);
    const otherTasks = project.tasks.filter(task => task.assignedTo.toString() !== user.id);

    return (
        <div className="task-container">
            <h2>{project.name}</h2>
            <p>{project.description}</p>

            {isCreator && (
                <div className="assign-task">
                    <h4>Assign New Task</h4>
                    <input
                        type="text"
                        placeholder="Task description"
                        value={newTask}
                        onChange={e => setNewTask(e.target.value)}
                    />
                    <select
                        value={assignedTo}
                        onChange={e => setAssignedTo(e.target.value)}
                    >
                        <option value="">Select member</option>
                        {project.members.map(member => (
                            <option key={member.userId} value={member.username}>
                                {member.username}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleAssignTask}>Assign Task</button>
                </div>
            )}

            <h3>Your Tasks</h3>
            <div className="tasks-list">
                {userTasks.map(task => (
                    <div key={task._id} className="task-card">
                        <h4>{task.description}</h4>
                        <p>Assigned to: {task.assignedUsername || 'Unassigned'}</p>
                        <p>Status:
                            <select
                                value={statusMap[task._id]}
                                onChange={e => handleChangeTaskStatus(task._id, e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="in progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </p>
                    </div>
                ))}
            </div>

            <h3>Other Tasks</h3>
            <div className="tasks-list">
                {otherTasks.map(task => (
                    <div key={task._id} className="task-card">
                        <h4>{task.description}</h4>
                        <p>Assigned to: {task.assignedUsername || 'Unassigned'}</p>
                        <p>Status: {statusMap[task._id]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Task;