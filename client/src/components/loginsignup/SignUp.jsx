import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignUp = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://codetogether-3c8e.onrender.com/api/auth/signup', { username, email, password });
      if (response.data.token) {
        // Store token and redirect to home
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      } else {
        console.log('Signup failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <h2>Hello!!</h2>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
        <p className="login-text">
          Already have an account? <span onClick={handleLoginRedirect} className="login-link">Login</span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
