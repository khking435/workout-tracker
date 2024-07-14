# workout_tracker/app/services/userworkout_service.py

from models import UserWorkout
from app.utils.database import db

class UserWorkoutService:
    @staticmethod
    def create_userworkout(data):
        new_userworkout = UserWorkout(**data)
        db.session.add(new_userworkout)
        db.session.commit()
        return new_userworkout

    @staticmethod
    def get_userworkout_by_id(userworkout_id):
        return UserWorkout.query.get(userworkout_id)

    @staticmethod
    def get_all_userworkouts():
        return UserWorkout.query.all()

    @staticmethod
    def update_userworkout(userworkout_id, data):
        userworkout = UserWorkout.query.get(userworkout_id)
        if userworkout:
            for key, value in data.items():
                setattr(userworkout, key, value)
            db.session.commit()
        return userworkout

    @staticmethod
    def delete_userworkout(userworkout_id):
        userworkout = UserWorkout.query.get(userworkout_id)
        if userworkout:
            db.session.delete(userworkout)
            db.session.commit()
        return userworkout
