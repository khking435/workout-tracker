import React from 'react';

// Component for displaying details of a single workout
const UserWorkoutDetails = ({ workout }) => {
    return (
        <div>
            {/* Display workout name as a heading */}
            <h2>Name{workout.name}</h2>
            {/* Display workout duration */}
            <p>Duration: {workout.duration} minutes</p>
            {/* Display workout date */}
            <p>Date: {workout.date}</p>

        </div>
    );
};

export default UserWorkoutDetails;
