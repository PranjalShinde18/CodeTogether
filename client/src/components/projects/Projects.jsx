// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Projects.css';

// const Projects = () => {
//     const [createdProjects, setCreatedProjects] = useState([]);
//     const [joinedProjects, setJoinedProjects] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const config = {
//                     headers: { 'x-auth-token': token }
//                 };

//                 // Fetch created projects
//                 const createdResponse = await axios.get('http://localhost:5000/api/projects/created', config);
//                 setCreatedProjects(createdResponse.data.projects);

//                 // Fetch joined projects
//                 const joinedResponse = await axios.get('http://localhost:5000/api/projects/joined', config);
//                 setJoinedProjects(joinedResponse.data.projects);
//             } catch (error) {
//                 console.error('Error fetching projects:', error);
//             }
//         };

//         fetchProjects();
//     }, []);

//     const handleCreateProject = () => {
//         navigate('/create');
//     };

//     const handleJoinProject = () => {
//         navigate('/join');
//     };

//     const handleTasksClick = (projectId) => {
//         navigate(`/projects/${projectId}/tasks`);
//     };

//     const handleCodeClick = (projectId) => {
//         navigate(`/projects/${projectId}/code`);
//     };


//     return (
//         <div className="projects-container">
//             <div className="projects-header">
//                 <h2>Projects</h2>
//                 <div className="project-buttons">
//                     <button className="create-project-button" onClick={handleCreateProject}>
//                         <i className='bx bx-plus project-icon'></i>Create Project
//                     </button>
//                     <button className="join-project-button" onClick={handleJoinProject}>
//                         <i className='bx bx-user-plus project-icon'></i>Join Project
//                     </button>
//                 </div>
//             </div>

//             <div className="projects-section">
//                 <h3 className="section-title">Projects You Created</h3>
//                 <div className="projects-list">
//                     {createdProjects.map(project => (
//                         <div key={project._id} className="project-card">
//                             <h4>{project.name}</h4>
//                             <p>{project.description}</p>
//                             <div className="project-buttons">
//                                 <button className='task-button' onClick={() => handleTasksClick(project._id)}>Tasks</button>
//                                 <button className='code-button' onClick={() => handleCodeClick(project._id)}>Code</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="projects-section">
//                 <h3 className="section-title">Projects You Joined</h3>
//                 <div className="projects-list">
//                     {joinedProjects.map(project => (
//                         <div key={project._id} className="project-card">
//                             <h4>{project.name}</h4>
//                             <p>{project.description}</p>
//                             <div className="project-buttons">
//                                 <button className='task-button' onClick={() => handleTasksClick(project._id)}>Tasks</button>
//                                 <button className='code-button' onClick={() => handleCodeClick(project._id)}>Code</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Projects;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
    const [createdProjects, setCreatedProjects] = useState([]);
    const [joinedProjects, setJoinedProjects] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const config = {
                    headers: { 'x-auth-token': token }
                };

                // Fetch created projects
                const createdResponse = await axios.get('http://localhost:5000/api/projects/created', config);
                setCreatedProjects(createdResponse.data.projects);

                // Fetch joined projects
                const joinedResponse = await axios.get('http://localhost:5000/api/projects/joined', config);
                setJoinedProjects(joinedResponse.data.projects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        if (token) {
            fetchProjects();
        }
    }, [token]);

    const handleCreateProject = () => {
        navigate('/create');
    };

    const handleJoinProject = () => {
        navigate('/join');
    };

    const handleTasksClick = (projectId) => {
        navigate(`/projects/${projectId}/tasks`);
    };

    const handleCodeClick = (projectId) => {
        navigate(`/projects/${projectId}/code`);
    };

    if (!token) {
        return (
            <div className="projects-container">
                <div className="projects-header">
                    <h2>Projects</h2>
                </div>
                <p>Please login or signup to view your projects.</p>
            </div>
        );
    }

    return (
        <div className="projects-container">
            <div className="projects-header">
                <h2>Projects</h2>
                <div className="project-buttons">
                    <button className="create-project-button" onClick={handleCreateProject}>
                        <i className='bx bx-plus project-icon'></i>Create Project
                    </button>
                    <button className="join-project-button" onClick={handleJoinProject}>
                        <i className='bx bx-user-plus project-icon'></i>Join Project
                    </button>
                </div>
            </div>

            <div className="projects-section">
                <h3 className="section-title">Projects You Created</h3>
                <div className="projects-list">
                    {createdProjects.map(project => (
                        <div key={project._id} className="project-card">
                            <h4>{project.name}</h4>
                            <p>{project.description}</p>
                            <div className="project-buttons">
                                <button className='task-button' onClick={() => handleTasksClick(project._id)}>Tasks</button>
                                <button className='code-button' onClick={() => handleCodeClick(project._id)}>Code</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="projects-section">
                <h3 className="section-title">Projects You Joined</h3>
                <div className="projects-list">
                    {joinedProjects.map(project => (
                        <div key={project._id} className="project-card">
                            <h4>{project.name}</h4>
                            <p>{project.description}</p>
                            <div className="project-buttons">
                                <button className='task-button' onClick={() => handleTasksClick(project._id)}>Tasks</button>
                                <button className='code-button' onClick={() => handleCodeClick(project._id)}>Code</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
