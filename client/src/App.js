// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import Sidebar from './components/navbar/Sidebar';
// import Login from './components/loginsignup/Login';
// import Home from './components/home/Home';
// import './App.css';
// import './form.css';
// import SignUp from './components/loginsignup/SignUp';
// import Projects from './components/projects/Projects';
// import Create from './components/projects/Create';
// import Join from './components/projects/Join';
// import Task from './components/projects/Task/Task';

// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (token) {
//       fetch('http://localhost:5000/api/auth/profile', {
//         headers: {
//           'x-auth-token': token,
//         },
//       })
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Unauthorized');
//           }
//           return response.json();
//         })
//         .then(data => {
//           if (data.user) {
//             setUser(data.user);
//           } else {
//             console.error('Error fetching user data:', data.error);
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching user data:', error);
//           setUser(null);
//           localStorage.removeItem('token');
//           setToken('');
//         });
//     }
//   }, [token]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="*" element={<Layout token={token} setToken={setToken} user={user} />} />
//       </Routes>
//     </Router>
//   );
// };

// const Layout = ({ token, setToken, user }) => {
//   const location = useLocation();
//   const shouldShowSidebar = !['/login', '/signup'].includes(location.pathname);

//   return (
//     <div className="App">
//       {shouldShowSidebar && <Sidebar token={token} user={user} />}
//       <div className="content">
//         <Routes>
//           <Route path="/login" element={<Login setToken={setToken} />} />
//           <Route path="/signup" element={<SignUp setToken={setToken} />} />
//           <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
//           <Route path="/projects" element={<Projects />} />
//           <Route path="/create" element={<Create />} />
//           <Route path="/join" element={<Join />} />
//           <Route path="/projects/:projectId/tasks" element={<Task />} />
//           <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;





// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import Sidebar from './components/navbar/Sidebar';
// import Login from './components/loginsignup/Login';
// import Home from './components/home/Home';
// import './App.css';
// import './form.css';
// import SignUp from './components/loginsignup/SignUp';
// import Projects from './components/projects/Projects';
// import Create from './components/projects/Create';
// import Join from './components/projects/Join';
// import Task from './components/projects/Task/Task';
// import CodeEditor from './components/projects/Code/CodeEditor'; // Import the CodeEditor component

// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (token) {
//       fetch('http://localhost:5000/api/auth/profile', {
//         headers: {
//           'x-auth-token': token,
//         },
//       })
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Unauthorized');
//           }
//           return response.json();
//         })
//         .then(data => {
//           if (data.user) {
//             setUser(data.user);
//           } else {
//             console.error('Error fetching user data:', data.error);
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching user data:', error);
//           setUser(null);
//           localStorage.removeItem('token');
//           setToken('');
//         });
//     }
//   }, [token]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="*" element={<Layout token={token} setToken={setToken} user={user} />} />
//       </Routes>
//     </Router>
//   );
// };

// const Layout = ({ token, setToken, user }) => {
//   const location = useLocation();
//   const shouldShowSidebar = !['/login', '/signup'].includes(location.pathname);

//   return (
//     <div className="App">
//       {shouldShowSidebar && <Sidebar token={token} user={user} />}
//       <div className="content">
//         <Routes>
//           <Route path="/login" element={<Login setToken={setToken} />} />
//           <Route path="/signup" element={<SignUp setToken={setToken} />} />
//           <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
//           <Route path="/projects" element={<Projects />} />
//           <Route path="/create" element={<Create />} />
//           <Route path="/join" element={<Join />} />
//           <Route path="/projects/:projectId/tasks" element={<Task />} />
//           <Route path="/projects/:projectId/code" element={<CodeEditor token={token} />} /> {/* Add the CodeEditor route */}
//           <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/navbar/Sidebar';
import Login from './components/loginsignup/Login';
import Home from './components/home/Home';
import './App.css';
import './form.css';
import SignUp from './components/loginsignup/SignUp';
import Projects from './components/projects/Projects';
import Create from './components/projects/Create';
import Join from './components/projects/Join';
import Task from './components/projects/Task/Task';
import CodeEditor from './components/projects/Code/CodeEditor';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'x-auth-token': token,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Unauthorized');
          }
          return response.json();
        })
        .then(data => {
          if (data.user) {
            setUser(data.user);
          } else {
            console.error('Error fetching user data:', data.error);
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setUser(null);
          localStorage.removeItem('token');
          setToken('');
        });
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Layout token={token} setToken={setToken} user={user} />} />
      </Routes>
    </Router>
  );
};

const Layout = ({ token, setToken, user }) => {
  const location = useLocation();
  const shouldShowSidebar = !['/login', '/signup'].includes(location.pathname);

  return (
    <div className="App">
      {shouldShowSidebar && <Sidebar token={token} user={user} />}
      <div className="content">
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<SignUp setToken={setToken} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/create" element={<Create />} />
          <Route path="/join" element={<Join />} />
          <Route path="/projects/:projectId/tasks" element={<Task />} />
          <Route path="/projects/:projectId/code" element={<CodeEditor token={token} />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
