import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('date');

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5555/workouts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setWorkouts(data))
      .catch(error => console.error('Error fetching workouts:', error));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredWorkouts = workouts
    .filter(workout => workout.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'date') {
        return new Date(a.date) - new Date(b.date);
      }
      return a[sort].localeCompare(b[sort]);
    });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-3">Workouts</h1>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        className="form-control mb-3"
        placeholder="Filter by name"
      />
      <select
        value={sort}
        onChange={handleSortChange}
        className="form-select mb-3"
      >
        <option value="date">Date</option>
        <option value="name">Name</option>
        <option value="duration">Duration</option>
        <option value="type">Type</option>
      </select>
      <Link to="/add-workout" className="btn btn-primary mb-3">Add Workout</Link>
      <ul className="list-group">
        {filteredWorkouts.map(workout => (
          <li key={workout.id} className="list-group-item">
            <Link to={`/workouts/${workout.id}`} className="text-decoration-none">
              <div>
                <strong>{workout.name}</strong> - {workout.date} - {workout.duration} - {workout.type}
              </div>
              <ul>
                {workout.exercises?.map(exercise => (
                  <li key={exercise.id}>
                    {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Weight: {exercise.weight}
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutList;
