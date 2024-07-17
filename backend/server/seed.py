from datetime import date, timedelta
from faker import Faker
from app import app
from database_models.db import db, User, Workout, Exercise, UserWorkout

# Initialize Faker
faker = Faker()

with app.app_context():
     # Drop all tables
    db.drop_all()

    # Create all tables
    db.create_all()

    # Generate fake users
    users = []
    for _ in range(10):  # Create 10 users
        user = User(username=faker.user_name(), email=faker.email(), password=faker.password())
        users.append(user)
    
    # Print sample of generated users
    print("Sample of generated users:")
    for user in users[:3]:  # Print first 3 users as sample
        print(f"Username: {user.username}, Email: {user.email}")

    # Confirm before adding users to the database
    confirm = input("Do you want to add these users to the database? (yes/no): ")
    if confirm.lower() == 'yes':
        for user in users:
            db.session.add(user)
        db.session.commit()  # Commit users to get their IDs
    else:
        print("Users not added to the database.")
        exit()

    # Generate fake workouts
    workouts = []
    for _ in range(25):  # Create 25 workouts
        workout = Workout(
            name=faker.word(),
            date=faker.date_this_year(),
            duration=faker.random_int(min=20, max=90),
            type=faker.random_element(elements=('cardio', 'strength', 'flexibility', 'balance'))
        )
        workouts.append(workout)
        db.session.add(workout)
    
    # Commit workouts to get their IDs
    db.session.commit()

    # Generate fake exercises
    exercises = []
    for workout in workouts:
        for _ in range(23):  # Create 23 exercises per workout
            exercise = Exercise(
                workout_id=workout.id,
                name=faker.word(),
                sets=faker.random_int(min=1, max=5),
                reps=faker.random_int(min=5, max=20),
                weight=faker.random_int(min=0, max=100)
            )
            exercises.append(exercise)
            db.session.add(exercise)
    
    # Commit exercises to get their IDs
    db.session.commit()

    # Generate fake user workouts
    user_workouts = []
    for user in users:
        workout = faker.random_element(elements=workouts)
        startdate = faker.date_between(start_date='-1y', end_date='today')  # Random start date within the past year
        completiondate = faker.date_between(start_date=startdate, end_date='+30d')  # Completion date within 30 days of start date
        feedback = faker.sentence()  # Random feedback text
        user_workout = UserWorkout(
            user_id=user.id, 
            workout_id=workout.id,
            startdate=startdate,
            completiondate=completiondate,
            feedback=feedback
        )
        user_workouts.append(user_workout)
    
    # Print sample of generated user workouts
    print("Sample of generated user workouts:")
    for user_workout in user_workouts[:3]:  # Print first 3 user workouts as sample
        print(f"User ID: {user_workout.user_id}, Workout ID: {user_workout.workout_id}, Start Date: {user_workout.startdate}, Completion Date: {user_workout.completiondate}, Feedback: {user_workout.feedback}")

    # Confirm before adding user workouts to the database
    confirm = input("Do you want to add these user workouts to the database? (yes/no): ")
    if confirm.lower() == 'yes':
        for user_workout in user_workouts:
            db.session.add(user_workout)
        db.session.commit()  # Commit all changes
    else:
        print("User workouts not added to the database.")
        exit()

    print("Database seeded with Faker data!")
