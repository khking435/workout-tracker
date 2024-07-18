import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserWorkoutForm = ({ userId }) => {
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({
    workoutId: '',
    startDate: '',
    completionDate: '',
    feedback: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = workout.id ? 'PUT' : 'POST'; // Use workout.id to determine if it's an edit or new entry
    const url = workout.id ? `http://localhost:5555/userworkouts/${workout.id}` : 'http://localhost:5555/userworkouts';

    // Format dates as ISO strings
    const formattedStartDate = new Date(workout.startDate).toISOString().split('T')[0];
    const formattedCompletionDate = new Date(workout.completionDate).toISOString().split('T')[0];

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...workout,
        startDate: formattedStartDate,
        completionDate: formattedCompletionDate
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add user workout');
      }
      return response.json();
    })
    .then(data => {
      console.log('User workout added:', data);
      navigate('/userworkoutList'); // Redirect after successful submission
    })
    .catch(error => {
      console.error('Error adding user workout:', error.message);
      // Optionally, update state or display an error message to the user
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  return (
    <div>
      <h1>New User Workout</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="workoutId" value={workout.workoutId} onChange={handleChange} placeholder="Workout ID" required />
        <input type="date" name="startDate" value={workout.startDate} onChange={handleChange} required />
        <input type="date" name="completionDate" value={workout.completionDate} onChange={handleChange} required />
        <input type="text" name="feedback" value={workout.feedback} onChange={handleChange} placeholder="Feedback" required />

        <button type="submit">Add User Workout</button>
      </form>
    </div>
  );
};

export default UserWorkoutForm;
