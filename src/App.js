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
import UserWorkoutForm from "./components/User/UserWorkoutForm";
import UserWorkoutList from "./components/User/UserWorkoutList";

// Main App component
const App = () => {
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
        </div>
      </div>
    </Router>
  );
};

export default App;
