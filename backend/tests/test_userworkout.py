import pytest
from models import UserWorkout
from services.userworkout_service import UserWorkoutService

def test_create_userworkout(session):
    data = {'user_id': 1, 'workout_id': 1, 'start_date': '2024-07-01', 'completion_date': '2024-07-02', 'feedback': 'Great workout!'}
    userworkout = UserWorkoutService.create_userworkout(data)
    assert userworkout.id is not None
    assert userworkout.feedback == 'Great workout!'

def test_get_userworkout_by_id(session):
    data = {'user_id': 1, 'workout_id': 1, 'start_date': '2024-07-01', 'completion_date': '2024-07-02', 'feedback': 'Tough but rewarding.'}
    userworkout = UserWorkoutService.create_userworkout(data)
    retrieved_userworkout = UserWorkoutService.get_userworkout_by_id(userworkout.id)
    assert retrieved_userworkout.feedback == 'Tough but rewarding.'

def test_get_all_userworkouts(session):
    userworkouts = UserWorkoutService.get_all_userworkouts()
    assert len(userworkouts) > 0

def test_update_userworkout(session):
    data = {'user_id': 1, 'workout_id': 1, 'start_date': '2024-07-01', 'completion_date': '2024-07-02', 'feedback': 'Good workout!'}
    userworkout = UserWorkoutService.create_userworkout(data)
    update_data = {'feedback': 'Excellent workout!'}
    updated_userworkout = UserWorkoutService.update_userworkout(userworkout.id, update_data)
    assert updated_userworkout.feedback == 'Excellent workout!'

def test_delete_userworkout(session):
    data = {'user_id': 1, 'workout_id': 1, 'start_date': '2024-07-01', 'completion_date': '2024-07-02', 'feedback': 'Challenging workout!'}
    userworkout = UserWorkoutService.create_userworkout(data)
    deleted_userworkout = UserWorkoutService.delete_userworkout(userworkout.id)
    assert deleted_userworkout is not None
    assert UserWorkoutService.get_userworkout_by_id(userworkout.id) is None
