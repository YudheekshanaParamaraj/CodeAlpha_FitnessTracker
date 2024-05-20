import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import './Dashboard.css';

const Dashboard = () => {
  const { state } = useLocation(); 
  const username = state?.username ?? ''; 
  const navigate = useNavigate(); 

  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('');
  const [date, setDate] = useState('');
  const [caloriesBurnt, setCaloriesBurnt] = useState('');

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiRange, setBmiRange] = useState('');

  const handleLogout = () => {
    navigate('/');
  };

  const handleLogWorkout = async (e) => {
    e.preventDefault();

    if (!workoutType || !duration || !intensity || !date || !caloriesBurnt) {
      alert('Please fill in all fields');
      return;
    }

    const workoutData = {
      username,
      workoutType,
      duration,
      intensity,
      date,
      caloriesBurnt 
    };

    try {
      const response = await axios.post('http://localhost:3000/workouts', workoutData);
      console.log('Workout logged successfully:', response.data);

      setWorkoutType('');
      setDuration('');
      setIntensity('');
      setDate('');
      setCaloriesBurnt('');

      alert('Workout successfully logged');
    } catch (error) {
      console.error('Error logging workout:', error);
      alert('An error occurred while logging the workout. Please try again.');
    }
  };

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    setBmiResult(bmi.toFixed(2));
  };

  const navigateToWorkouts = () => {
    navigate('/workouts', { state: { username } }); 
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">Fitfun</div>
        <div className="navbar-links">
          <NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink>
          <NavLink to="/workouts" activeclassname="active" onClick={navigateToWorkouts}>Workouts</NavLink>
        </div>
        <div className="navbar-user">
          <span>Welcome, {username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="content-container">
        <div className="card workout-form">
          <h2>Log Your Workout</h2>
          <form onSubmit={handleLogWorkout}>
            <div className="form-group">
              <label>Workout Type</label>
              <input
                type="text"
                value={workoutType}
                onChange={(e) => setWorkoutType(e.target.value)}
                placeholder="Enter workout type"
                required
              />
            </div>
            <div className="form-group">
              <label>Duration (in minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter duration"
                required
              />
            </div>
            <div className="form-group">
              <label>Intensity</label>
              <select
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
                required
              >
                <option value="">Select intensity</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="form-group">
              <label>Calories Burnt (in Kcal)</label>
              <input
                type="number"
                value={caloriesBurnt}
                onChange={(e) => setCaloriesBurnt(e.target.value)}
                placeholder="Enter calories burnt"
                required
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <button type="submit">Log Workout</button>
          </form>
        </div>

        <div className="card bmi-calculator">
          <h2>BMI Calculator</h2>
          <div className="form-group">
            <label>Height (in cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height"
              required
            />
          </div>
          <div className="form-group">
            <label>Weight (in kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
              required
            />
          </div>
          <button onClick={calculateBMI}>Calculate BMI</button>
          {bmiResult && <p>Your BMI: {bmiResult}</p>}
          {bmiResult && (
            <p>
              Your BMI category:{" "}
              {bmiResult < 18.5
                ? "Underweight"
                : bmiResult < 25
                ? "Healthy Weight"
                : bmiResult < 30
                ? "Overweight"
                : "Obese"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
