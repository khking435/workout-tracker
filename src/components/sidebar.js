import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/exercises">Exercises</Link></li>
            <li><Link to="/workoutList">Workouts</Link></li>
            <li><Link to="/user-workouts">User Workout</Link></li>
          </ul>
        </nav>
      </div>
      {isOpen && <div className="backdrop" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Sidebar;
