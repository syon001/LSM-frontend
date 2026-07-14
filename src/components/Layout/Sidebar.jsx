import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ isMobile, isOpen, onClose }) {
  const menuItems = [
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: '/courses', icon: '📚', label: 'Courses' },
    { path: '/assignments', icon: '📝', label: 'Assignments' },
    { path: '/certificates', icon: '🎓', label: 'Certificates' },
    { path: '/messages', icon: '💬', label: 'Messages' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  const handleClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  return (
    <div className={`sidebar ${isMobile ? (isOpen ? 'mobile-open' : '') : ''}`}>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink 
              to={item.path} 
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={handleClick}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;