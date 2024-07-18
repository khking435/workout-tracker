import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Component for creating or editing a workout
const WorkoutForm = () => {
  // Get the ID from the URL
  const { id } = useParams(); 
  // Navigation hook
  const navigate = useNavigate(); 
  // State to hold workout details
  const [workout, setWorkout] = useState({
    name: '',
    date: '',
    duration: '',
    type: ''
  }); 

  // Fetch workout details for editing
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5555/workouts/${id}`)
        .then(response => response.json())
        .then(data => setWorkout(data));
    }
  }, [id]); // Re-fetch workout details when ID changes

  // Update state with new input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value }); 
  };

  // Determine HTTP method and URL based on whether it's an edit or new entry
  const handleSubmit = (e) => {
    e.preventDefault();

    const method = id ? 'PUT' : 'POST'; 
    const url = id ? `http://localhost:5555/workouts/${id}` : 'http://localhost:5555/workouts'; 

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workout)
    }).then(() => navigate('/workoutList')); // Redirect to workout list after successful submission
  };

  return (
    <div>
      <h1>{id ? 'Edit Workout' : 'New Workout'}</h1>
      {/* Form for creating or editing a workout */}
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

