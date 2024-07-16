import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    // Fetch workout details from the backend
    fetch(`/https://localhost:5555/workouts/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch workout details');
        }
        return response.json();
      })
      .then(data => setWorkout(data))
      .catch(error => {
        console.error('Error fetching workout details:', error);
      });
  }, [id]);

  const handleDelete = () => {
    // Delete workout
    fetch(`/api/workouts/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete workout');
        }
        // Navigate to workout list after successful deletion
        navigate('/workouts');
      })
      .catch(error => {
        console.error('Error deleting workout:', error);
      });
  };

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{workout.name}</h1>
      <p>Date: {workout.date}</p>
      <p>Duration: {workout.duration}</p>
      <p>Type: {workout.type}</p>
      <h2>Exercises</h2>
      <ul>
        {workout.exercises.map(exercise => (
          <li key={exercise.id}>
            {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Weight: {exercise.weight}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(`/workouts/${id}/edit`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <Link to="/workouts">Back to Workout List</Link>
    </div>
  );
};

export default WorkoutDetail;
