# workout_tracker/app/services/workout_service.py

from models import Workout
from app.utils.database import db

class WorkoutService:
    @staticmethod
    def create_workout(data):
        new_workout = Workout(**data)
        db.session.add(new_workout)
        db.session.commit()
        return new_workout

    @staticmethod
    def get_workout_by_id(workout_id):
        return Workout.query.get(workout_id)

    @staticmethod
    def get_all_workouts():
        return Workout.query.all()

    @staticmethod
    def update_workout(workout_id, data):
        workout = Workout.query.get(workout_id)
        if workout:
            for key, value in data.items():
                setattr(workout, key, value)
            db.session.commit()
        return workout

    @staticmethod
    def delete_workout(workout_id):
        workout = Workout.query.get(workout_id)
        if workout:
            db.session.delete(workout)
            db.session.commit()
        return workout
