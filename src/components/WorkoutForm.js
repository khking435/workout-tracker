import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Component for creating or editing a workout
const WorkoutForm = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // Navigation hook
  const [workout, setWorkout] = useState({
    name: '',
    date: '',
    duration: '',
    type: ''
  }); // State to hold workout details

  useEffect(() => {
    if (id) {
      // Fetch workout details for editing
      fetch(`http://localhost:5555/workouts/${id}`)
        .then(response => response.json())
        .then(data => setWorkout(data));
    }
  }, [id]); // Re-fetch workout details when ID changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value }); // Update state with new input value
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = id ? 'PUT' : 'POST'; // Determine HTTP method based on whether it's an edit or new entry
    const url = id ? `http://localhost:5555/workouts/${id}` : 'http://localhost:5555/workouts'; // Determine URL based on whether it's an edit or new entry

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workout)
    }).then(() => navigate('/workoutList')); // Redirect to workout list after successful submission
  };

  return (
    <div>
      <h1>{id ? 'Edit Workout' : 'New Workout'}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={workout.name} onChange={handleChange} placeholder="Name" required />
        <input type="date" name="date" value={workout.date} onChange={handleChange} required />
        <input type="text" name="duration" value={workout.duration} onChange={handleChange} placeholder="Duration" required />
        <input type="text" name="type" value={workout.type} onChange={handleChange} placeholder="Type" required />

        <button type="submit">Save Workout</button>
      </form>
      <button onClick={() => navigate('/workoutList')}>Cancel</button> 
    </div>
  );
};

export default WorkoutForm;

