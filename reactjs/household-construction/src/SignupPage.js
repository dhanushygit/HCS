import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import './AuthPages.css';
import hcs from '../src/assets/images/hcs.jpg';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Initialize navigate

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Signup successful! You can now log in.');

        // Redirect to login page after successful signup
        setTimeout(() => {
          navigate('/');
        }, 2000);  // Wait for 2 seconds before redirecting to show success message

        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        setMessage(data.message || 'Signup failed');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };
  const redirectToLogin= () => {
    navigate('/'); // Replace '/signup' with the actual route for your signup page
  };

  return (
    <div style={{ background:'black', padding: '120px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif',borderRadius:'20px' }}>
      <div className='img'>
       <img src={hcs} alt='login' size={5}/>
      </div>
      <h1 style={{ textAlign: 'center', color: 'white' }}>Signup</h1>
      <form onSubmit={handleSignup}>
        <div style={{ marginBottom: '15px' , color:'white'}}>
          <label className='form-label'>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' , color:'white'}}>
          <label className='form-label'>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' , color:'white'}}>
          <label className='form-label'>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required
          />
        </div>
        <button className='form-button'
          type="submit"
        >
          Signup
        </button>
      </form>
      <h3 className='form-label'>Already have an account:<button className="form-button"  onClick={redirectToLogin}>Login</button></h3>
      {message && <p style={{ textAlign: 'center', color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default SignupPage;
