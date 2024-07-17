import React, { useState, useEffect } from 'react';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('name');

  useEffect(() => {
    fetch("/api/exercises")
      .then(response => response.json())
      .then(data => setExercises(data))
      .catch(error => console.error('Error fetching exercises:', error));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredExercises = exercises
    .filter(exercise => 
      exercise.name.toLowerCase().includes(filter.toLowerCase()) ||
      exercise.sets.toString().includes(filter) ||
      exercise.reps.toString().includes(filter) ||
      exercise.weight.toString().includes(filter)
    )
    .sort((a, b) => {
      if (sort === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sort === 'sets' || sort === 'reps' || sort === 'weight') {
        return a[sort] - b[sort];
      } else {
        return 0;
      }
    });

  return (
    <div>
      <h2>Exercises</h2>
      <div>
        <input 
          type="text" 
          value={filter} 
          onChange={handleFilterChange} 
          placeholder="Filter by name, sets, reps, weight" 
        />
        <select value={sort} onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="sets">Sets</option>
          <option value="reps">Reps</option>
          <option value="weight">Weight</option>
        </select>
      </div>
      <ul>
        {filteredExercises.map(exercise => (
          <li key={exercise.id}>
            {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Weight: {exercise.weight}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
