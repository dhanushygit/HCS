import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HouseholdServices from './HouseholdServices';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HouseholdServices />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
