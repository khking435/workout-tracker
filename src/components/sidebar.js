import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

/**
 * Sidebar component that is used to display navigation links
 * @returns {React.ReactElement} The sidebar component
 */
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggle the sidebar open and closed
   */
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle button to open and close the sidebar */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Menu'}
      </button>
      {/* The sidebar component itself */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <ul>
            <li>
              {/* Link to the exercises page */}
              <Link to="/exercises">Exercises</Link>
            </li>
            <li>
              {/* Link to the workouts page */}
              <Link to="/workoutList">Workouts</Link>
            </li>
            <li>
              {/* Link to the user workouts page */}
              <Link to="/user-workouts">User Workout</Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* A backdrop that is used to close the sidebar when clicked */}
      {isOpen && <div className="backdrop" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Sidebar;

