import React from 'react';

// Component for displaying list of workouts
const UserWorkoutList = ({ workouts }) => {
    if (!workouts || workouts.length === 0) {
        return <p>No workouts found.</p>;
    }

    return (
        <ul className="list-group">
            {/* Render list of workouts */}
            {workouts.map(workout => (
                // Each workout is displayed as a list item
                <li key={workout.id} className="list-group-item">
                    {/* Display workout name, duration, and date */}
                    {workout.name} - {workout.duration} minutes on {new Date(workout.date).toLocaleDateString()}
                </li>
            ))}
        </ul>
    );
};

export default UserWorkoutList;
