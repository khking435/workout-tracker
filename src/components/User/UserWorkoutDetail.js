import React from 'react';

// Component for displaying details of a single workout
const UserWorkoutDetails = ({ workout }) => {
    return (
        <div>
            {/* Display workout name as a heading */}
            <h2>{workout.name}</h2>
            {/* Display workout duration */}
            <p>Duration: {workout.duration} minutes</p>
            {/* Display workout date */}
          
        </div>
    );
};

export default UserWorkoutDetails;
