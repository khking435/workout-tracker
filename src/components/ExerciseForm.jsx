import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ExerciseForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      sets: '',
      reps: '',
      weight: '',
      workout_id: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().max(50, 'Exercise Name is too long!').required('The name of the Exercise is required'),
      sets: Yup.number().required('Required').min(1, 'Must be at least 1 set'),
      reps: Yup.number().required('Required').min(1, 'Must be at least 1 rep'),
      weight: Yup.number().required('Required').min(1, 'Must be at least 1 lb'),
      workout_id: Yup.number().required('Required')
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const newExercise = { ...values };
      const token = localStorage.getItem('token'); 
      
      fetch('http://localhost:5555/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add Authorization header
        },
        body: JSON.stringify(newExercise)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log('Exercise added:', data);
          resetForm();
        })
        .catch(error => {
          console.error('Error adding exercise:', error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add a new exercise</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="invalid-feedback">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="sets" className="form-label">Sets</label>
          <input
            id="sets"
            name="sets"
            type="number"
            className={`form-control ${formik.touched.sets && formik.errors.sets ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.sets}
          />
          {formik.touched.sets && formik.errors.sets ? (
            <div className="invalid-feedback">{formik.errors.sets}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="reps" className="form-label">Reps</label>
          <input
            id="reps"
            name="reps"
            type="number"
            className={`form-control ${formik.touched.reps && formik.errors.reps ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.reps}
          />
          {formik.touched.reps && formik.errors.reps ? (
            <div className="invalid-feedback">{formik.errors.reps}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">Weight (lbs)</label>
          <input
            id="weight"
            name="weight"
            type="number"
            className={`form-control ${formik.touched.weight && formik.errors.weight ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.weight}
          />
          {formik.touched.weight && formik.errors.weight ? (
            <div className="invalid-feedback">{formik.errors.weight}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="workout_id" className="form-label">Workout ID</label>
          <input
            id="workout_id"
            name="workout_id"
            type="number"
            className={`form-control ${formik.touched.workout_id && formik.errors.workout_id ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.workout_id}
          />
          {formik.touched.workout_id && formik.errors.workout_id ? (
            <div className="invalid-feedback">{formik.errors.workout_id}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>Add Exercise</button>
      </form>
    </div>
  );
}

export default ExerciseForm;
