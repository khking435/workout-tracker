import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('date');

  useEffect(() => {
    // Fetch workouts from the backend
    fetch('http://localhost:5555/workouts') 
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
    <div>
      <h1>Workouts</h1>
      <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filter by name" />
      <select value={sort} onChange={handleSortChange}>
        <option value="date">Date</option>
        <option value="name">Name</option>
        <option value="duration">Duration</option>
        <option value="type">Type</option>
      </select>
      <Link to="/add-workout">Add Workout</Link>  
      <ul>
        {filteredWorkouts.map(workout => (
          <li key={workout.id}>
            <Link to={`/workouts/${workout.id}`}>
              {workout.name} - {workout.date} - {workout.duration} - {workout.type}
            </Link>
          </li>
        ))}
      </ul>
     
    </div>
  );
};

export default WorkoutList;
