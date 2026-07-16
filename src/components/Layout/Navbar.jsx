import React from 'react';
import { Link } from 'react-router-dom';
import lmsData from '../../data/lmsData.json';

function Navbar({ onHamburgerClick, isSidebarOpen }) {
  const user = lmsData.user;

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          className="hamburger-menu" 
          onClick={onHamburgerClick}
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>
        
        <Link to="/" className="navbar-brand">
          📚 LearnHub
        </Link>
      </div>
      
      <div className="navbar-search">
        <input type="text" placeholder="Search courses..." />
      </div>
      
      <div className="navbar-menu">
        <div className="notification-icon">
          🔔
          <span className="notification-badge">3</span>
        </div>
        
        <div className="user-avatar" title={user.name}>
          {user.avatar}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
