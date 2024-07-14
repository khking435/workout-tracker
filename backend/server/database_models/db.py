# Import SQLAlchemy for database handling
from flask_sqlalchemy import SQLAlchemy

# Importing MetaData
from sqlalchemy import MetaData

metadata = MetaData()

# Create a SQLAlchemy object
db = SQLAlchemy(metadata=metadata)

# Define the Exercise model
class Exercise(db.Model):
    __tablename__ = "Exercises"  # Changed the table name
    # Primary key column
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    # Foreign key to the Workout model
    workout_id = db.Column(db.Integer, db.ForeignKey('Workouts.id'), nullable=False)
    # Name of the exercise
    name = db.Column(db.String(100), nullable=False)
    # Number of sets
    sets = db.Column(db.Integer, nullable=False)
    # Number of repetitions
    reps = db.Column(db.Integer, nullable=False)
    # Weight used in the exercise
    weight = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"<Exercise {self.id}: {self.name}, Workout ID: {self.workout_id}>"

# Define the Workout model
class Workout(db.Model):
    __tablename__ = "Workouts"  # Changed the table name
    # Primary key column
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    # Name of the workout
    name = db.Column(db.String(100), nullable=False)
    # Date of the workout
    date = db.Column(db.Date, nullable=False)
    # Duration of the workout in minutes
    duration = db.Column(db.Integer, nullable=False)
    # Type of workout (e.g., cardio, strength)
    type = db.Column(db.String(50), nullable=False)
    # One-to-many relationship with Exercise
    exercises = db.relationship('Exercise', backref='workout', lazy=True)

    def __repr__(self):
        return f"<Workout {self.id}: {self.name}>"

# Define the User model
class User(db.Model):
    __tablename__ = "Users"  # Changed the table name
    # Primary key column
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    # Username
    username = db.Column(db.String(80), nullable=False)
    # Email address
    email = db.Column(db.String(120), nullable=False)
    # Password
    password = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f"<User {self.id}: {self.username}>"

# Define the UserWorkout model
class UserWorkout(db.Model):
    __tablename__ = "Userworkouts"  # Changed the table name
    # Primary key column
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    # Foreign key to the User model
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    # Foreign key to the Workout model
    workout_id = db.Column(db.Integer, db.ForeignKey('Workouts.id'), nullable=False)

    def __repr__(self):
        return f"<UserWorkout {self.id}: User ID {self.user_id}, Workout ID {self.workout_id}>"
