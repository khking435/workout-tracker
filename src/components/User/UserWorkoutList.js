import React, { useState, useEffect } from 'react';
import UserWorkoutForm from './UserWorkoutForm';

const UserWorkoutList = () => {
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('startdate');
  const [showUserWorkoutForm, setShowUserWorkoutForm] = useState(false);


  useEffect(() => {
    fetch("http://127.0.0.1:5555/userworkouts")
      .then(response => response.json())
      .then(data => setUserWorkouts(data))
      .catch(error => console.error('Error fetching user workouts:', error));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleShowUserWorkoutForm = () => setShowUserWorkoutForm(!showUserWorkoutForm);

  const filteredUserWorkouts = userWorkouts
    .filter(userWorkout => 
      (userWorkout.feedback || '').toLowerCase().includes(filter.toLowerCase()) ||
      (new Date(userWorkout.startdate).toLocaleDateString() || '').includes(filter) ||
      (new Date(userWorkout.completiondate).toLocaleDateString() || '').includes(filter)
    )
    .sort((a, b) => {
      if (sort === 'startdate' || sort === 'completiondate') {
        return new Date(a[sort]) - new Date(b[sort]);
      } else {
        return 0;
      }
    });

  return (
    <div>
      <h2>User Workouts</h2>
      <div>
        <input 
          type="text" 
          value={filter} 
          onChange={handleFilterChange} 
          placeholder="Filter by dates or feedback" 
        />
        <select value={sort} onChange={handleSortChange}>
          <option value="startdate">Start Date</option>
          <option value="completiondate">Completion Date</option>
        </select>
      </div>
      <button onClick={handleShowUserWorkoutForm}>
        {showUserWorkoutForm ? 'Hide User Workout Form' : 'Show User Workout Form'}
      </button>
      {showUserWorkoutForm && <UserWorkoutForm />}
      <ul>
        {filteredUserWorkouts.map(userWorkout => (
          <li key={userWorkout.id}>
            Start Date: {new Date(userWorkout.startdate).toLocaleDateString()} 
            - Completion Date: {new Date(userWorkout.completiondate).toLocaleDateString()}
            - Feedback: {userWorkout.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserWorkoutList;
