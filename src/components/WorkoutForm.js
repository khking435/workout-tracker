import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";

const WorkoutForm = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Navigation hook
  const [workout, setWorkout] = useState({
    name: "",
    date: "",
    duration: "",
    type: "",
  });
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (id) {
      // Fetch workout details for editing
      fetch(`http://localhost:5555/workouts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setWorkout(data);
          setSelectedExercises(
            data.exercises.map((exercise) => ({
              value: exercise.id,
              label: exercise.name,
            }))
          );
        });
    }

    // Fetch all exercises
    fetch("http://localhost:5555/exercises", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setExercises(data));
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleExerciseChange = (selectedOptions) => {
    setSelectedExercises(selectedOptions || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:5555/workouts/${id}`
      : "http://localhost:5555/workouts";

    const selectedExerciseIds = selectedExercises.map((exercise) => exercise.value);
    const updatedWorkout = { ...workout, exerciseIds: selectedExerciseIds };

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedWorkout),
    })
      .then(() => navigate("/workoutList")) // Redirect to workout list after successful submission
      .catch((error) => console.error("Error:", error)); // Handle errors
  };

  const exerciseOptions = exercises.map((exercise) => ({
    value: exercise.id,
    label: exercise.name,
  }));

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">{id ? "Edit Workout" : "New Workout"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={workout.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={workout.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={workout.duration}
            onChange={handleChange}
            className="form-control"
            placeholder="Duration"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={workout.type}
            onChange={handleChange}
            className="form-control"
            placeholder="Type"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exercises" className="form-label">Exercises</label>
          <Select
            isMulti
            value={selectedExercises}
            onChange={handleExerciseChange}
            options={exerciseOptions}
            className="form-control"
            name="exercises"
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Workout</button>
      </form>
      {id && (
        <button
          className="btn btn-secondary mt-2"
          onClick={() => navigate("/workoutList")}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default WorkoutForm;
