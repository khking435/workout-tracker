import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserWorkoutList = () => {
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('startdate');

  useEffect(() => {
    fetch("http://localhost:5555/userworkouts")
      .then(response => response.json())
      .then(data => setUserWorkouts(data))
      .catch(error => console.error('Error fetching user workouts:', error));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredUserWorkouts = userWorkouts
    .filter(userWorkout =>
      (userWorkout.feedback || '').toLowerCase().includes(filter.toLowerCase()) ||
      (new Date(userWorkout.startdate).toLocaleDateString() || '').includes(filter) ||
      (new Date(userWorkout.completiondate).toLocaleDateString() || '').includes(filter)
    )
    .sort((a, b) => {
      if (sort === 'startdate' || sort === 'completiondate') {
        return new Date(a[sort]) - new Date(b[sort]);
      } else {
        return 0;
      }
    });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">User Workouts</h2>
      <div className="mb-3">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          className="form-control"
          placeholder="Filter by dates or feedback"
        />
        <select
          value={sort}
          onChange={handleSortChange}
          className="form-select mt-2"
        >
          <option value="startdate">Start Date</option>
          <option value="completiondate">Completion Date</option>
        </select>
      </div>
      <Link to="/add-user-workout" className="btn btn-primary mb-3">Add User Workout</Link>
      <ul className="list-group">
        {filteredUserWorkouts.map(userWorkout => (
          <li key={userWorkout.id} className="list-group-item">
            Start Date: {new Date(userWorkout.startdate).toLocaleDateString()} - Completion Date: {new Date(userWorkout.completiondate).toLocaleDateString()} - Feedback: {userWorkout.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserWorkoutList;
