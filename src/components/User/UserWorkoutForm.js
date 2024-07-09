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

 

}






















export default UserWorkoutForm;