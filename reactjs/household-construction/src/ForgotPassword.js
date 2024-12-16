import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/password-reset/', { email });
      setMessage('A password reset link has been sent to your email address.');
      setError('');
    } catch (err) {
      setMessage('');
      setError('There was an error. Please try again.');
    }
  };

  return (
    <div className="forgot-password">
      <h2>Forgot Password?</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
