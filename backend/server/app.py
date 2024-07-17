from flask import Flask, jsonify, request
from flask_migrate import Migrate
from database_models.db import db, User, Workout, UserWorkout, Exercise
from flask_cors import CORS
from flask_restful import Api


# Initializing Flask application
app = Flask(__name__)

# Configuring the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

# Initializing the migrate
migrate = Migrate(app, db)

# Initializing the app with the db
db.init_app(app)

api = Api(app)

@app.route('/')
def index():
    """Route to welcome message"""
    return 'Hello, Fitness World!'


# Routes for Users
@app.route('/users', methods=['GET'])
def get_all_users():
    """Route to get all users"""
    users = User.query.all()
    users_list = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]
    return jsonify(users_list), 200

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Route to get a specific user by ID"""
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    user_data = {'id': user.id, 'username': user.username, 'email': user.email}
    return jsonify(user_data), 200

@app.route('/users', methods=['POST'])
def create_user():
    """Route to create a new user"""
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Missing username, email, or password'}), 400

    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Route to update an existing user"""
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.json
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)

    db.session.commit()
    return jsonify({'message': 'User updated successfully'}), 200

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """Route to delete a user"""
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200


# Routes for Workouts

@app.route('/workouts', methods=['GET'])
def get_all_workouts():
    """Route to get all workouts"""
    workouts = Workout.query.all()
    workouts_list = [{'id': workout.id, 'name': workout.name, 'date': workout.date.strftime('%Y-%m-%d'), 'duration': workout.duration, 'type': workout.type} for workout in workouts]
    return jsonify(workouts_list), 200

@app.route('/workouts/<int:workout_id>', methods=['GET'])
def get_workout(workout_id):
    """Route to get a specific workout by ID"""
    workout = Workout.query.get(workout_id)
    if not workout:
        return jsonify({'error': 'Workout not found'}), 404
    workout_data = {'id': workout.id, 'name': workout.name, 'date': workout.date.strftime('%Y-%m-%d'), 'duration': workout.duration, 'type': workout.type}
    return jsonify(workout_data), 200


@app.route('/workouts', methods=['POST'])
def create_workout():
    """Route to create a new workout"""
    data = request.json
    name = data.get('name')
    date = data.get('date')
    duration = data.get('duration')
    type = data.get('type')

    if not name or not date or not duration or not type:
        return jsonify({'error': 'Missing workout name, date, duration, or type'}), 400

    new_workout = Workout(name=name, date=date, duration=duration, type=type)
    db.session.add(new_workout)
    db.session.commit()

    return jsonify({'message': 'Workout created successfully'}), 201


@app.route('/workouts/<int:workout_id>', methods=['DELETE'])
def delete_workout(workout_id):
    """Route to delete a workout"""
    workout = Workout.query.get(workout_id)
    if not workout:
        return jsonify({'error': 'Workout not found'}), 404

    db.session.delete(workout)
    db.session.commit()
    return jsonify({'message': 'Workout deleted successfully'}), 200


# Routes for UserWorkouts

@app.route('/userworkouts', methods=['GET'])
def get_all_userworkouts():
    """Route to get all userworkouts"""
    userworkouts = UserWorkout.query.all()
    userworkouts_list = [{
        'id': userworkout.id, 
        'user_id': userworkout.user_id, 
        'workout_id': userworkout.workout_id,
        'startdate': userworkout.startdate.isoformat(),  # Convert date to ISO format
        'completiondate': userworkout.completiondate.isoformat(),  # Convert date to ISO format
        'feedback': userworkout.feedback
    } for userworkout in userworkouts]
    return jsonify(userworkouts_list), 200

@app.route('/userworkouts/<int:userworkout_id>', methods=['GET'])
def get_userworkout(userworkout_id):
    """Route to get a specific userworkout by ID"""
    userworkout = UserWorkout.query.get(userworkout_id)
    if not userworkout:
        return jsonify({'error': 'UserWorkout not found'}), 404
    userworkout_data = {
        'id': userworkout.id,
        'user_id': userworkout.user_id,
        'workout_id': userworkout.workout_id,
        'startdate': userworkout.startdate.isoformat(),  # Convert date to ISO format
        'completiondate': userworkout.completiondate.isoformat(),  # Convert date to ISO format
        'feedback': userworkout.feedback
    }
    return jsonify(userworkout_data), 200

@app.route('/userworkouts', methods=['POST'])
def create_userworkout():
    """Route to create a new userworkout"""
    data = request.json
    user_id = data.get('user_id')
    workout_id = data.get('workout_id')
    startdate = data.get('startdate')
    completiondate = data.get('completiondate')
    feedback = data.get('feedback')

    if not user_id or not workout_id or not startdate or not completiondate or not feedback:
        return jsonify({'error': 'Missing required fields'}), 400

    # Convert startdate and completiondate from string to date
    try:
        startdate = datetime.fromisoformat(startdate)
        completiondate = datetime.fromisoformat(completiondate)
    except ValueError:
        return jsonify({'error': 'Invalid date format'}), 400

    new_userworkout = UserWorkout(
        user_id=user_id,
        workout_id=workout_id,
        startdate=startdate,
        completiondate=completiondate,
        feedback=feedback
    )
    db.session.add(new_userworkout)
    db.session.commit()

    return jsonify({'message': 'UserWorkout created successfully'}), 201

@app.route('/userworkouts/<int:userworkout_id>', methods=['DELETE'])
def delete_userworkout(userworkout_id):
    """Route to delete a userworkout"""
    userworkout = UserWorkout.query.get(userworkout_id)
    if not userworkout:
        return jsonify({'error': 'UserWorkout not found'}), 404

    db.session.delete(userworkout)
    db.session.commit()
    return jsonify({'message': 'UserWorkout deleted successfully'}), 200


# Routes for Exercises

@app.route('/exercises', methods=['GET'])
def get_all_exercises():
    """Route to get all exercises"""
    exercises = Exercise.query.all()
    exercises_list = [{'id': exercise.id, 'name': exercise.name, 'sets': exercise.sets, 'reps': exercise.reps, 'weight': exercise.weight} for exercise in exercises]
    return jsonify(exercises_list), 200

@app.route('/exercises/<int:exercise_id>', methods=['GET'])
def get_exercise(exercise_id):
    """Route to get a specific exercise by ID"""
    exercise = Exercise.query.get(exercise_id)
    if not exercise:
        return jsonify({'error': 'Exercise not found'}), 404
    exercise_data = {'id': exercise.id, 'name': exercise.name, 'sets': exercise.sets, 'reps': exercise.reps, 'weight': exercise.weight}
    return jsonify(exercise_data), 200

@app.route('/exercises', methods=['POST'])
def create_exercise():
    """Route to create a new exercise"""
    data = request.json
    name = data.get('name')
    sets = data.get('sets')
    reps = data.get('reps')
    weight = data.get('weight')

    if not name or sets is None or reps is None or weight is None:
        return jsonify({'error': 'Missing exercise name, sets, reps, or weight'}), 400

    new_exercise = Exercise(name=name, sets=sets, reps=reps, weight=weight)
    db.session.add(new_exercise)
    db.session.commit()

    return jsonify({'message': 'Exercise created successfully'}), 201

@app.route('/exercises/<int:exercise_id>', methods=['PUT'])
def update_exercise(exercise_id):
    """Route to update an existing exercise"""
    exercise = Exercise.query.get(exercise_id)
    if not exercise:
        return jsonify({'error': 'Exercise not found'}), 404

    data = request.json
    exercise.name = data.get('name', exercise.name)
    exercise.sets = data.get('sets', exercise.sets)
    exercise.reps = data.get('reps', exercise.reps)
    exercise.weight = data.get('weight', exercise.weight)

    db.session.commit()
    return jsonify({'message': 'Exercise updated successfully'}), 200

@app.route('/exercises/<int:exercise_id>', methods=['DELETE'])
def delete_exercise(exercise_id):
    """Route to delete an exercise"""
    exercise = Exercise.query.get(exercise_id)
    if not exercise:
        return jsonify({'error': 'Exercise not found'}), 404

    db.session.delete(exercise)
    db.session.commit()
    return jsonify({'message': 'Exercise deleted successfully'}), 200


# Code to print all registered routes
#with app.test_request_context():
#    print([str(rule) for rule in app.url_map.iter_rules()])

if __name__ == '__main__':
    app.run(port=5555, debug=True)
