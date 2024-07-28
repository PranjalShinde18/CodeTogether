import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const token = localStorage.getItem('token');

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Collaborative Coding Platform</h1>
        <p>Collaborate, code, and conquer your projects together!</p>
      </header>
      <section className="home-features">
        <div className="feature">
          <h3>Real-time Collaboration</h3>
          <p>Work on code together with your team in real-time.</p>
        </div>
        <div className="feature">
          <h3>Project Management</h3>
          <p>Organize your tasks, track progress, and meet deadlines.</p>
        </div>
        <div className="feature">
          <h3>Interactive Coding Environment</h3>
          <p>Write, run, and test code directly in the browser.</p>
        </div>
        <div className="feature">
          <h3>Seamless Integration</h3>
          <p>Integrate with popular coding platforms for enhanced workflow.</p>
        </div>
      </section>
      {!token && (
        <div className="auth-buttons">
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/signup" className="btn-signup">Signup</Link>
        </div>
      )}

    </div>
  );
};

export default Home;
