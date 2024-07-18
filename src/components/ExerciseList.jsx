import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('name');

  useEffect(() => {
    fetch("http://localhost:5555/exercises")
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
    <div className="container mt-4">
      <h2 className="text-center mb-3">Exercises</h2>
      <div className="mb-3">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          className="form-control"
          placeholder="Filter by name, sets, reps, weight"
        />
        <select
          value={sort}
          onChange={handleSortChange}
          className="form-select mt-2"
        >
          <option value="name">Name</option>
          <option value="sets">Sets</option>
          <option value="reps">Reps</option>
          <option value="weight">Weight</option>
        </select>
      </div>
      <Link to="/add-exercise" className="btn btn-primary mb-3">Add Exercise</Link>
      <ul className="list-group">
        {filteredExercises.map(exercise => (
          <li key={exercise.id} className="list-group-item">
            {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Weight: {exercise.weight}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
