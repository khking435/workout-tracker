import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import WorkoutList from "./components/WorkoutList";
import WorkoutDetail from "./components/WorkoutDetails";
import WorkoutForm from "./components/WorkoutForm";
import ExerciseList from "./components/ExerciseList";
import ExerciseForm from "./components/ExerciseForm";
import UserWorkoutList from "./components/User/UserWorkoutList";
import UserWorkoutForm from "./components/User/UserWorkoutForm";
import UserWorkoutDetail from "./components/User/UserWorkoutDetail";
import Sidebar from "./components/sidebar.js";

// Main App component
const App = () => {
  return (
    <Router>
      <div className="App">
      <div className="main-content"> 
      <Sidebar /> 
    </div>
        <div className="container mx-auto mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/workoutList" element={<WorkoutList />} />
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
