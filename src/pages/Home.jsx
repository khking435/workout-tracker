import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <div className="navbar-brand">FitFusion</div>
        <nav className="navbar">
          <Link to="/about-us" className="navbar-link">About Us</Link>
          <button className="button" onClick={() => alert('Button Clicked')}>Contact Us</button>
        </nav>
      </header>

      <main className="main-content">
        <section className="welcome-section">
          <h1>Welcome to FitFusion</h1>
          <p>Your ultimate workout companion. Track your workouts, monitor your progress, and stay motivated!</p>
        </section>

        <section className="info-section">
          <h2>Comprehensive Exercises</h2>
          <p>Discover a wide range of exercises tailored to meet your fitness goals. From strength training to cardio, we have it all!</p>
        </section>

        <section className="info-section">
          <h2>Personalized Plans</h2>
          <p>Create personalized workout plans that fit your schedule and fitness level. Stay on track and achieve your goals!</p>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 FitFusion. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
