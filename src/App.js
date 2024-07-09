<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import WorkoutList from "./components/WorkoutList";
import WorkoutDetail from "./components/WorkoutDetail";
import WorkoutForm from "./components/WorkoutForm";
import ExerciseList from "./components/ExerciseList";
import ExerciseForm from "./components/ExerciseForm";
import UserWorkoutList from "./User/UserWorkoutList";
import UserWorkoutForm from "./User/UserWorkoutForm";
import UserWorkoutDetail from "./User/UserWorkoutDetail";
=======
import React, { useState, useEffect } from 'react';
import UserWorkoutForm from './components/User/UserWorkoutForm'; 
import UserWorkoutList from './components/User/UserWorkoutList'; 
>>>>>>> user-components

// Main App component
const App = () => {
<<<<<<< HEAD
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mx-auto mt-4">
          <Switch>
            <Route exact path="/" component={WorkoutList} />
            <Route path="/workouts/:id" component={WorkoutDetail} />
            <Route path="/add-workout" component={WorkoutForm} />
            <Route path="/exercises" component={ExerciseList} />
            <Route path="/add-exercise" component={ExerciseForm} />
            <Route path="/user-workouts" component={UserWorkoutList} />
            <Route path="/add-user-workout" component={UserWorkoutForm} />
            <Route path="/user-workouts/:id" component={UserWorkoutDetail} />
          </Switch>
=======
    // State hook for storing workouts
    const [workouts, setWorkouts] = useState([]);

    // Fetch workouts from API on component mount
    useEffect(() => {
        fetch(' http://localhost:3000/api/workouts')
            .then(response => response.json())
            .then(data => setWorkouts(data))
            .catch(error => console.error('Error fetching workouts:', error));
    }, []);

    // Function to handle new workout submission
    const handleNewWorkout = (newWorkout) => {
        setWorkouts([...workouts, newWorkout]); // Add new workout to current list
    };

    return (
        <div className="container">
            <h1 className="mt-4 mb-4">Workout Tracker</h1>
            {/* User workout form component */}
            <UserWorkoutForm onSubmit={handleNewWorkout} />
            <h2 className="mt-4 mb-4">Workouts</h2>
            {/* User workout list component */}
            <UserWorkoutList workouts={workouts} />
>>>>>>> user-components
        </div>
      </div>
    </Router>
  );
};

export default App;
