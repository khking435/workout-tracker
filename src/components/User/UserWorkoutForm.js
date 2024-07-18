import React, { useState } from 'react';

// Component for user workout form
const UserWorkoutForm = ({ onSubmit }) => {
    // State hooks for form fields
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        const newWorkout = { name, duration, date };

        // Send POST request to API
        fetch('http://127.0.0.1:5000/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWorkout),
        })
            .then(response => response.json())
            .then(data => {
                onSubmit(data); // Call onSubmit prop with new workout data
                // Clear form fields
                setName('');
                setDuration('');
                setDate('');
            })
            .catch(error => console.error('Error adding workout:', error));
    };

    return (
        // Form element with Bootstrap styling
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="duration" className="form-label">Duration:</label>
                <input
                    type="text"
                    className="form-control"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="date" className="form-label">Date:</label>
                <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-block">Add Workout</button>
            </div>
        </form>
    );
};

export default UserWorkoutForm;
