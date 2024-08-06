import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Create.css';

const Create = () => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [projectId, setProjectId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                'https://codetogether-3c8e.onrender.com/api/projects/create',
                {
                    name: projectName,
                    description,
                    project_id: projectId,
                    password
                },
                {
                    headers: {
                        'x-auth-token': token
                    }
                }
            );
            navigate('/projects')
            console.log('Project created:', response.data);

        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <div className='create_page'>
            <form onSubmit={handleSubmit}>
                <h2>Create a New Project</h2>
                <div>
                    <label>Project Name:</label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Project ID:</label>
                    <input
                        type="text"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Project</button>
            </form>
        </div>

    );
};

export default Create;
