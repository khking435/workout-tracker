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
      const newExercise = {
        ...values
      };

      fetch('http://localhost:5555/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExercise)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(
              'Network response was not ok ' + response.statusText
            );
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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2>Add a new exercise</h2>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="sets">Sets</label>
          <input
            id="sets"
            name="sets"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.sets}
          />
          {formik.touched.sets && formik.errors.sets ? (
            <div>{formik.errors.sets}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="reps">Reps</label>
          <input
            id="reps"
            name="reps"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.reps}
          />
          {formik.touched.reps && formik.errors.reps ? (
            <div>{formik.errors.reps}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="weight">Weight (lbs)</label>
          <input
            id="weight"
            name="weight"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.weight}
          />
          {formik.touched.weight && formik.errors.weight ? (
            <div>{formik.errors.weight}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="workout_id">Workout ID</label>
          <input
            id="workout_id"
            name="workout_id"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.workout_id}
          />
          {formik.touched.workout_id && formik.errors.workout_id ? (
            <div>{formik.errors.workout_id}</div>
          ) : null}
        </div>
        <button type="submit" disabled={formik.isSubmitting}>Add Exercise</button>
      </form>
    </div>
  );
}

export default ExerciseForm;
