import pytest
from models import Workout
from services.workout_service import WorkoutService

def test_create_workout(session):
    data = {'user_id': 1, 'name': 'Morning Workout', 'date': '2024-07-01', 'duration': 60, 'type': 'Cardio'}
    workout = WorkoutService.create_workout(data)
    assert workout.id is not None
    assert workout.name == 'Morning Workout'

def test_get_workout_by_id(session):
    data = {'user_id': 1, 'name': 'Evening Workout', 'date': '2024-07-01', 'duration': 45, 'type': 'Strength'}
    workout = WorkoutService.create_workout(data)
    retrieved_workout = WorkoutService.get_workout_by_id(workout.id)
    assert retrieved_workout.name == 'Evening Workout'

def test_get_all_workouts(session):
    workouts = WorkoutService.get_all_workouts()
    assert len(workouts) > 0

def test_update_workout(session):
    data = {'user_id': 1, 'name': 'Afternoon Workout', 'date': '2024-07-01', 'duration': 30, 'type': 'Flexibility'}
    workout = WorkoutService.create_workout(data)
    update_data = {'name': 'Afternoon Workout', 'duration': 35, 'type': 'Yoga'}
    updated_workout = WorkoutService.update_workout(workout.id, update_data)
    assert updated_workout.duration == 35
    assert updated_workout.type == 'Yoga'

def test_delete_workout(session):
    data = {'user_id': 1, 'name': 'Night Workout', 'date': '2024-07-01', 'duration': 50, 'type': 'HIIT'}
    workout = WorkoutService.create_workout(data)
    deleted_workout = WorkoutService.delete_workout(workout.id)
    assert deleted_workout is not None
    assert WorkoutService.get_workout_by_id(workout.id) is None
