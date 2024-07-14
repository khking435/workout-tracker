import pytest
from models import Exercise
from services.exercise_service import ExerciseService

def test_create_exercise(session):
    data = {'workout_id': 1, 'name': 'Squat', 'sets': 3, 'reps': 10, 'weight': 100}
    exercise = ExerciseService.create_exercise(data)
    assert exercise.id is not None
    assert exercise.name == 'Squat'

def test_get_exercise_by_id(session):
    data = {'workout_id': 1, 'name': 'Bench Press', 'sets': 3, 'reps': 10, 'weight': 80}
    exercise = ExerciseService.create_exercise(data)
    retrieved_exercise = ExerciseService.get_exercise_by_id(exercise.id)
    assert retrieved_exercise.name == 'Bench Press'

def test_get_all_exercises(session):
    exercises = ExerciseService.get_all_exercises()
    assert len(exercises) > 0

def test_update_exercise(session):
    data = {'workout_id': 1, 'name': 'Deadlift', 'sets': 3, 'reps': 10, 'weight': 120}
    exercise = ExerciseService.create_exercise(data)
    update_data = {'name': 'Deadlift', 'sets': 4, 'reps': 8, 'weight': 130}
    updated_exercise = ExerciseService.update_exercise(exercise.id, update_data)
    assert updated_exercise.sets == 4
    assert updated_exercise.reps == 8

def test_delete_exercise(session):
    data = {'workout_id': 1, 'name': 'Pull-up', 'sets': 3, 'reps': 10, 'weight': 0}
    exercise = ExerciseService.create_exercise(data)
    deleted_exercise = ExerciseService.delete_exercise(exercise.id)
    assert deleted_exercise is not None
    assert ExerciseService.get_exercise_by_id(exercise.id) is None
