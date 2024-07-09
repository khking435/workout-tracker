import React, { useState, useEffect } from 'react';
import UserWorkoutForm from './components/User/UserWorkoutForm'; 
import UserWorkoutList from './components/User/UserWorkoutList'; 

// Main App component
const App = () => {
    // State hook for storing workouts
    const [workouts, setWorkouts] = useState([]);

    // Fetch workouts from API on component mount
    useEffect(() => {
        fetch('/api/workouts')
            .then(response => response.json())
            .then(data => setWorkouts(data))
            .catch(error => console.error('Error fetching workouts:', error));
    }, []);

    // Function to handle new workout submission
    const handleNewWorkout = (newWorkout) => {
      // Add new workout to current list
        setWorkouts([...workouts, newWorkout]); 
    };

    return (
        <div>
            <h1>Workout Tracker</h1>
            {/* User workout form component */}
            <UserWorkoutForm onSubmit={handleNewWorkout} />
            <h2>Workouts</h2>
            {/* User workout list component */}
            <UserWorkoutList workouts={workouts} />
        </div>
    );
};

export default App;
