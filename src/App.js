import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WorkoutList from "./components/WorkoutList";
import WorkoutDetail from "./components/WorkoutDetails";
import WorkoutForm from "./components/WorkoutForm";
import ExerciseList from "./components/ExerciseList";
import ExerciseForm from "./components/ExerciseForm";
import UserWorkoutList from "./components/User/UserWorkoutList";
import UserWorkoutForm from "./components/User/UserWorkoutForm";
import UserWorkoutDetail from "./components/User/UserWorkoutDetail";
import Navbar from "./components/Navbar/Navbar";

// Main App component
const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="container mx-auto mt-4">
          <Navbar />
          <UserWorkoutForm/>

          <Routes>
            <Route path="/" element={<WorkoutList />} />
            <Route path="/workouts/:id" element={<WorkoutDetail />} />
            <Route path="/add-workout" element={<WorkoutForm />} />
            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/add-exercise" element={<ExerciseForm />} />
            <Route path="/user-workouts" element={<UserWorkoutList />} />
            <Route path="/add-user-workout" element={<UserWorkoutForm />} />
            <Route path="/user-workouts/:id" element={<UserWorkoutDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;