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
      <h2 className="text-2xl font-bold mb-4">Exercises</h2>
      <ul>
        {exercises.map(exercise => (
          <li key={exercise.id} className="mb-2 p-2 border rounded">
            {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Weight: {exercise.weight} lbs
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExerciseList;
