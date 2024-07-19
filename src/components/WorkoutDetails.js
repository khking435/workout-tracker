import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const WorkoutDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch workout details from the backend
    fetch(`http://localhost:5555/workouts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch workout details");
        }
        return response.json();
      })
      .then((data) => setWorkout(data))
      .catch((error) => {
        console.error("Error fetching workout details:", error);
      });
  }, [id, token]);

  const handleDelete = () => {
    // Delete workout
    fetch(`http://localhost:5555/workouts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete workout");
        }
        // Navigate to workout list after successful deletion
        navigate("/workouts");
      })
      .catch((error) => {
        console.error("Error deleting workout:", error);
      });
  };

  if (!workout) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{workout.name}</h1>
      <p><strong>Date:</strong> {workout.date}</p>
      <p><strong>Duration:</strong> {workout.duration}</p>
      <p><strong>Type:</strong> {workout.type}</p>
      <h2 className="mt-4">Exercises</h2>
      <ul className="list-group">
        {workout.exercises?.map((exercise) => (
          <li key={exercise.id} className="list-group-item">
            {exercise.name} - Sets: {exercise.sets}, Reps: {exercise.reps}, Weight: {exercise.weight}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button className="btn btn-primary mr-2" onClick={() => navigate(`/workouts/${id}/edit`)}>Edit</button>
        <button className="btn btn-danger mr-2" onClick={handleDelete}>Delete</button>
        <Link to="/workoutList" className="btn btn-secondary">Back to Workout List</Link>
      </div>
    </div>
  );
};

export default WorkoutDetail;
