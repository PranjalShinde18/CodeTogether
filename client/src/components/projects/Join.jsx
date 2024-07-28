// src/pages/Join.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './Join.css';
import { useNavigate } from 'react-router-dom';

const Join = () => {
    const [projectId, setProjectId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Assuming token is stored in local storage

        try {
            const response = await axios.post(
                'http://localhost:5000/api/projects/join',
                {
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
            console.log('Joined project:', response.data);

        } catch (error) {
            console.error('Error joining project:', error);
        }
    };

    return (
        <div className='join_page'>
            <form onSubmit={handleSubmit}>
                <h2>Join a Project</h2>
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
                <button type="submit">Join Project</button>
            </form>
        </div>
    );
};

export default Join;
