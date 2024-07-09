import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { exercises as allExercises } from './ExerciseList';

const WorkoutForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [workout, setWorkout] = useState({
    name: '',
    date: '',
    duration: '',
    type: '',
    exercises: []
  });

  useEffect(() => {
    if (id) {
      // Fetch workout details for editing
      fetch(`/api/workouts/${id}`)
        .then(response => response.json())
        .then(data => setWorkout(data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleExerciseChange = (index, e) => {
    const { name, value } = e.target;
    const newExercises = [...workout.exercises];
    newExercises[index] = { ...newExercises[index], [name]: value };
    setWorkout({ ...workout, exercises: newExercises });
  };

  const handleAddExercise = (exercise) => {
    setWorkout({
      ...workout,
      exercises: [...workout.exercises, { ...exercise, sets: '', reps: '', weight: '' }]
    });
  };

  const handleRemoveExercise = (index) => {
    const newExercises = workout.exercises.filter((_, i) => i !== index);
    setWorkout({ ...workout, exercises: newExercises });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/workouts/${id}` : '/api/workouts';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workout)
    }).then(() => history.push('/workouts'));
  };

  return (
    <div>
      <h1>{id ? 'Edit Workout' : 'New Workout'}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={workout.name} onChange={handleChange} placeholder="Name" required />
        <input type="date" name="date" value={workout.date} onChange={handleChange} required />
        <input type="text" name="duration" value={workout.duration} onChange={handleChange} placeholder="Duration" required />
        <input type="text" name="type" value={workout.type} onChange={handleChange} placeholder="Type" required />

        <h2>Exercises</h2>
        {workout.exercises.map((exercise, index) => (
          <div key={index}>
            <input type="text" name="name" value={exercise.name} onChange={(e) => handleExerciseChange(index, e)} placeholder="Exercise Name" required />
            <input type="number" name="sets" value={exercise.sets} onChange={(e) => handleExerciseChange(index, e)} placeholder="Sets" required />
            <input type="number" name="reps" value={exercise.reps} onChange={(e) => handleExerciseChange(index, e)} placeholder="Reps" required />
            <input type="number" name="weight" value={exercise.weight} onChange={(e) => handleExerciseChange(index, e)} placeholder="Weight" required />
            <button type="button" onClick={() => handleRemoveExercise(index)}>Remove</button>
          </div>
        ))}
        <div>
          <h3>Add Exercise</h3>
          <select onChange={(e) => handleAddExercise(allExercises.find(ex => ex.id === parseInt(e.target.value)))}>
            <option value="">Select an exercise</option>
            {allExercises.map(exercise => (
              <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Save Workout</button>
      </form>
      <button onClick={() => history.push('/workouts')}>Cancel</button>
    </div>
  );
};

export default WorkoutForm;
