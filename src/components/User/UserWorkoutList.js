import React from 'react';

// Component for displaying list of workouts
const UserWorkoutList = ({ workouts }) => {
    return (
        <ul>
            {/* Render list of workouts */}
            {workouts.map(workout => (
                // Each workout is displayed as a list item
                <li key={workout.id}>
                    {/* Display workout name, duration, and date */}
                    {workout.name} - {workout.duration} minutes on {workout.date}
                </li>
            ))}
        </ul>
    );
};

export default UserWorkoutList;
