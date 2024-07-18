
import { Link } from 'react-router-dom';
import '../index.css';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <nav className="sidebar">
        <ul className="sidebar-links">
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
  );
};

export default Sidebar;
