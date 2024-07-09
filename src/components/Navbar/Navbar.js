// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <span className="navbar-brand">Fit Fussion</span>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/workouts">Workouts</Link></li>
        <li><Link to="/exercises">Exercises</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
