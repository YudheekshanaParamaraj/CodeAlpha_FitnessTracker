import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const validateForm = () => {
    if (username === '' || email === '' || password === '') {
      alert('All fields are required!');
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault(); 
    if (validateForm()) {
      try {
        await axios.post('http://localhost:3000/username', { username, email, password });
        console.log('Signup successful');
        navigate('/'); 
      } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>Create an Account</h1>

      <form onSubmit={handleSignup} className="signup-form">
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button type="submit" className="signup-button">Sign up</button>
      </form>

      <p>
        Already have an account? <Link to="/">Login</Link> {}
      </p>
    </div>
  );
};

export default Signup;
