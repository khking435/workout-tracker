import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserWorkoutForm = () => {
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({
    workoutId: '',
    startDate: '',
    completionDate: '',
    feedback: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = workout.id ? 'PUT' : 'POST';
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

    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">New User Workout</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="workoutId" className="form-label">Workout ID</label>
          <input type="text" id="workoutId" name="workoutId" value={workout.workoutId} onChange={handleChange} className="form-control" placeholder="Workout ID" required />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input type="date" id="startDate" name="startDate" value={workout.startDate} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="completionDate" className="form-label">Completion Date</label>
          <input type="date" id="completionDate" name="completionDate" value={workout.completionDate} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="feedback" className="form-label">Feedback</label>
          <input type="text" id="feedback" name="feedback" value={workout.feedback} onChange={handleChange} className="form-control" placeholder="Feedback" required />
        </div>
        <button type="submit" className="btn btn-primary">Add User Workout</button>
      </form>
    </div>
  );
};

export default UserWorkoutForm;
