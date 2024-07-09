import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

const WorkoutDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    // Fetch workout details from the backend
    fetch(`/api/workouts/${id}`)
      .then(response => response.json())
      .then(data => setWorkout(data));
  }, [id]);

  const handleDelete = () => {
    // Delete workout
    fetch(`/api/workouts/${id}`, { method: 'DELETE' })
      .then(() => history.push('/workouts'));
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
      <button onClick={() => history.push(`/workouts/${id}/edit`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <Link to="/workouts">Back to Workout List</Link>
    </div>
  );
};

export default WorkoutDetail;
