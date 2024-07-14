
from models import Exercise
from app.utils.database import db

class ExerciseService:
    @staticmethod
    def create_exercise(data):
        new_exercise = Exercise(**data)
        db.session.add(new_exercise)
        db.session.commit()
        return new_exercise

    @staticmethod
    def get_exercise_by_id(exercise_id):
        return Exercise.query.get(exercise_id)

    @staticmethod
    def get_all_exercises():
        return Exercise.query.all()

    @staticmethod
    def update_exercise(exercise_id, data):
        exercise = Exercise.query.get(exercise_id)
        if exercise:
            for key, value in data.items():
                setattr(exercise, key, value)
            db.session.commit()
        return exercise

    @staticmethod
    def delete_exercise(exercise_id):
        exercise = Exercise.query.get(exercise_id)
        if exercise:
            db.session.delete(exercise)
            db.session.commit()
        return exercise
