// src/components/ExerciseList.jsx
import React, { useState, useEffect } from 'react';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch('/api/exercises')
      .then(response => response.json())
      .then(data => setExercises(data))
      .catch(error => console.error('Error fetching exercises:', error));
  }, []);

  return (
    <div>
      <h2>Exercises</h2>
      <ul>
        {exercises.map(exercise => (
          <li key={exercise.id}>
            {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Weight: {exercise.weight}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
