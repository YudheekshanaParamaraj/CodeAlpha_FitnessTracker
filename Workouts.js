import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Workouts.css';

const Workouts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState(location.state?.username || ''); 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (!username) return; 
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/workouts?username=${username}`);
        console.log('Fetched workout data:', response.data); 
        setWorkouts(response.data);
      } catch (error) {
        console.error('Error fetching workout data:', error);
      }
    };

    fetchData();
  }, [username]);

  
  useEffect(() => {
    setUsername(location.state?.username || ''); 
  }, [location.state?.username]);

  const filteredWorkouts = workouts.filter(workout => {
    const workoutDate = new Date(workout.date);
    const isSameDate = (
      workoutDate.getDate() === selectedDate.getDate() &&
      workoutDate.getMonth() === selectedDate.getMonth() &&
      workoutDate.getFullYear() === selectedDate.getFullYear()
    );
    const isSameUser = workout.username === username; 
    console.log(`Checking workout on ${workout.date}: isSameDate=${isSameDate}, isSameUser=${isSameUser}`);
    return isSameDate && isSameUser;
  });

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="workouts-container">
      <nav className="navbar">
        <div className="navbar-brand">Fitfun</div>
        <div className="navbar-links">
          <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
          <NavLink to="/workouts" activeClassName="active">Workouts</NavLink>
        </div>
        <div className="navbar-user">
          <span>Welcome, {username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="workouts-content">
        <div className="calendar-container">
          <h2>Calendar</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="calendar"
          />
        </div>
        <div className="workouts-list">
          <h2>Workouts logged on {selectedDate.toDateString()}</h2>
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map(workout => (
              <div className="workout-card" key={workout.id}>
                <p className="workout-type">{workout.workoutType.toUpperCase()}</p>
                <p className="workout-meta">Duration: {workout.duration} minutes</p>
                <p className="workout-meta">Intensity: {workout.intensity}</p>
                <p className="workout-meta">Calories Burnt: {workout.caloriesBurnt} kcal</p>
              </div>
            ))
          ) : (
            <p>No workouts logged for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
