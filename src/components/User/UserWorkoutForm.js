import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWorkoutForm = () => {
  const navigate = useNavigate();
  const [workout, setWorkout] = useState({
    workoutId: "",
    startDate: "",
    completionDate: "",
    feedback: "",
    userId: "" // Add userId to state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout({ ...workout, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // Format dates as ISO strings
    const formattedStartDate = new Date(workout.startDate).toISOString();
    const formattedCompletionDate = new Date(workout.completionDate).toISOString();

    fetch("http://localhost:5555/userworkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: workout.userId, // Send userId in request
        workout_id: workout.workoutId,
        startdate: formattedStartDate,
        completiondate: formattedCompletionDate,
        feedback: workout.feedback,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add user workout');
        }
        return response.json();
      })
      .then(() => navigate("/user-workouts"))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">New User Workout</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={workout.userId}
            onChange={handleChange}
            className="form-control"
            placeholder="User ID"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="workoutId" className="form-label">
            Workout ID
          </label>
          <input
            type="text"
            id="workoutId"
            name="workoutId"
            value={workout.workoutId}
            onChange={handleChange}
            className="form-control"
            placeholder="Workout ID"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={workout.startDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="completionDate" className="form-label">
            Completion Date
          </label>
          <input
            type="date"
            id="completionDate"
            name="completionDate"
            value={workout.completionDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="feedback" className="form-label">
            Feedback
          </label>
          <input
            type="text"
            id="feedback"
            name="feedback"
            value={workout.feedback}
            onChange={handleChange}
            className="form-control"
            placeholder="Feedback"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add User Workout
        </button>
      </form>
    </div>
  );
};

export default UserWorkoutForm;
