import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ token, user }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-name">Code Orbit</span>
      </div>
      <div className="sidebar-content">
        <ul className="lists">

          <li className="list">
            <Link to="/home" className="nav-link">
              <i className="bx bx-home-alt icon"></i>
              <span className="link">Home</span>
            </Link>
          </li>

          <li className="list">
            <Link to="/projects" className="nav-link">
              <i class='bx bx-folder icon' ></i>
              <span className="link">Projects</span>
            </Link>
          </li>

        </ul>

        <div className="bottom-content">
          {token ? (
            <div className="user-info-container">
              <div className="user-info">
                <div>
                  <p>{user?.username}</p>
                </div>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                <i className="bx bx-log-out icon"></i>
              </button>
            </div>
          ) : (
           <div className="login-demo"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
