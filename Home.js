import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/username?username=${username}`);
      const user = response.data.find((u) => u.username === username && u.password === password);

      if (user) {
        console.log('Login successful:', user);
        navigate('/dashboard', { state: { username: username } });
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="home-container">
      <div className="welcome">
        <h1>Welcome to Fitfun</h1>
        <p>Please login with your credentials</p>
      </div>

      <div className="login-form">
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>

      <div className="signup-box">
        Don't have an account?
        <Link to="/signup" className="signup-button">Click Here</Link>
      </div>
    </div>
  );
};

export default Home;
