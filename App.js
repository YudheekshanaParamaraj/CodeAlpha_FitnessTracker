// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Workouts from './Workouts';
import './App.css';

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const handleLogin = (username) => {
    setLoggedInUsername(username);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard username={loggedInUsername} />} />
          <Route path="/workouts" element={<Workouts username={loggedInUsername} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
