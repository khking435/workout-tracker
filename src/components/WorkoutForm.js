import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const WorkoutForm = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [workout, setWorkout] = useState({
    name: '',
    date: '',
    duration: '',
    type: ''
  });

  useEffect(() => {
    if (id) {
      // Fetch workout details for editing
      fetch(`http://localhost:5555/workouts/${id}`)
        .then(response => response.json())
        .then(data => setWorkout(data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:5555/workouts/${id}` : 'http://localhost:5555/workouts';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workout)
    }).then(() => navigate('/workoutList')); 
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
