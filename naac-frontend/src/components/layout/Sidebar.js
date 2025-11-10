// src/components/layout/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: 'house-door', label: 'Dashboard' },
    { path: '/schools', icon: 'building', label: 'Schools' },
    { path: '/programs', icon: 'book', label: 'Programs' },
    { path: '/semesters', icon: 'calendar3', label: 'Semesters' },
    { path: '/faculties', icon: 'people', label: 'Faculties' },
    { path: '/students', icon: 'person-badge', label: 'Students' },
    { path: '/assignments', icon: 'journal-text', label: 'Assignments' },
    { path: '/reports', icon: 'file-bar-graph', label: 'Reports' },
    { path: '/mentor-mentee', icon: 'person-lines-fill', label: 'Mentor-Mentee 2.2.2' },
    { path: '/performance', icon: 'graph-up-arrow', label: 'Performance 2.3.3' },
  ];

  return (
    <div className="bg-light border-end vh-100 sticky-top" style={{ width: '250px' }}>
      <div className="list-group list-group-flush">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`list-group-item list-group-item-action border-0 ${
              location.pathname === item.path ? 'active' : ''
            }`}
          >
            <i className={`bi bi-${item.icon} me-3`}></i>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
