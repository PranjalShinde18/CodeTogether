// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';

// const Login = ({ setToken }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await axios.post('https://codetogether-3c8e.onrender.com/api/auth/login', { username, password });
//         if (response.data.token) {
//             // Save token and redirect
//             console.log('Login successful:', response.data);
//             localStorage.setItem('token', response.data.token);
//             navigate('/home');
//         } else {
//             console.log('Login failed:', response.data.error);
//         }
//     } catch (error) {
//         console.error('Error logging in:', error.response?.data || error.message);
//     }
// };


//   const handleSignupRedirect = () => {
//     navigate('/signup');
//   };

//   return (
//     <div className="login-container">
//       <h2>Login Page</h2>
//       <form onSubmit={handleLogin}>
//         <div className="input-group">
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="input-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <p className="signup-text">
//         New User? <span onClick={handleSignupRedirect} className="signup-link">Signup</span>
//       </p>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Optional loading state
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://codetogether-3c8e.onrender.com/api/auth/login', { username, password });
      if (response.data.token) {
        // Save token and redirect
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token); // Update token in parent component if needed
        navigate('/home');
      } else {
        setError('Login failed: ' + response.data.error);
      }
    } catch (error) {
      setError('Error logging in: ' + (error.response?.data.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Welcome Back</h2>
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error-text">{error}</p>}
        <p className="signup-text">
          New User? <span onClick={handleSignupRedirect} className="signup-link">Signup</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
