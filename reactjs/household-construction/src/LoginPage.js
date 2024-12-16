import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPages.css';
import hcs from '../src/assets/images/hcs.jpg';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Welcome, ${data.username}!`);
        setTimeout(() => navigate('/home'), 1000); // Redirect after 2 seconds
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };
  const redirectToSignup = () => {
    navigate('/signup'); // Replace '/signup' with the actual route for your signup page
  };
  const redirectToforgot = () => {
    navigate('/forgot'); // Replace '/signup' with the actual route for your signup page
  };


  return (
    <div className="login-container">
      <div className='img' >
      <img src={hcs} alt='login' size={5}/>
      </div>
      <h1 className="login-heading">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="form-button">
          Login
        </button>
      </form>
      <h3 className='form-label'>Create an account:<button className="form-button"  onClick={redirectToSignup}>signup</button></h3>
      <h3 className='form-label'>Forgot your password:<button className="form-button"  onClick={redirectToforgot}>forgot</button></h3>
      {message && (
        <p className={`message ${message.includes('Welcome') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoginPage;
