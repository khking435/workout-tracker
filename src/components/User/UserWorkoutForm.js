import React, { useState } from 'react';

// Component for user workout form
const UserWorkoutForm = ({ onSubmit }) => {
    // State hooks for form fields
    const [userID, setUserID] = useState('');
    const [workoutID, setWorkoutID] = useState('');
    const [startDate, setStartDate] = useState('');
    const [completionDate, setCompletionDate] = useState('');
    const [feedback, setFeedback] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        const newUserWorkout = { userID, workoutID, startDate, completionDate, feedback };

        // Send POST request to API
        fetch('http://127.0.0.1:5555/userworkouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserWorkout),
        })
            .then(response => response.json())
            .then(data => {
                onSubmit(data); // Call onSubmit prop with new user workout data
                // Clear form fields
                setUserID('');
                setWorkoutID('');
                setStartDate('');
                setCompletionDate('');
                setFeedback('');
            })
            .catch(error => console.error('Error adding user workout:', error));
    };

    return (
        // Form element with Bootstrap styling
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
            <div className="mb-3">
                <label htmlFor="userID" className="form-label">User ID:</label>
                <input
                    type="text"
                    className="form-control"
                    id="userID"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="workoutID" className="form-label">Workout ID:</label>
                <input
                    type="text"
                    className="form-control"
                    id="workoutID"
                    value={workoutID}
                    onChange={(e) => setWorkoutID(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="startDate" className="form-label">Start Date:</label>
                <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="completionDate" className="form-label">Completion Date:</label>
                <input
                    type="date"
                    className="form-control"
                    id="completionDate"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="feedback" className="form-label">Feedback:</label>
                <textarea
                    className="form-control"
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-block">Add User Workout</button>
            </div>
        </form>
    );
};

export default UserWorkoutForm;
