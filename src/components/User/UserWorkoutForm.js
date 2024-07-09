import React  from 'react';

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
    fetch('/api/workouts', {
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
    // Log error if request fails
    .catch(error => console.error('Error adding workout:', error)); 

};

return (
     // Form element with submit handler
    <form>
        <div>
            
            <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        // Update name state
                        onChange={(e) => setName(e.target.value)} />
                    
                    
        </div>

        <div>
                <label>Duration:</label>
                    <input
                        type="text"
                        value={duration}
                        // Update duration state
                        onChange={(e) => setDuration(e.target.value)} />

                    
        </div>
        <div>
                    <label>Duration:</label>
                        <input
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)} // Update duration state
                        />
        </div>
        <div>
                    <label>Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)} // Update date state
                        />
        </div>
    </form>

);





















export default UserWorkoutForm;