import React from 'react';
import { FaComments, FaUser, FaCog } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <nav className="sidebar" aria-label="Sidebar navigation">
      <FaComments className="icon active" title="Conversations" />
      <FaUser className="icon" title="Users" />
      <FaCog className="icon" title="Settings" />
    </nav>
  );
};

export default Sidebar;
