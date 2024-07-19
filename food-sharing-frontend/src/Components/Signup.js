import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import '../css/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        username: formData.username,
        password: formData.password,
        confirm_password: formData.confirmPassword
      });

      console.log('Signup successful:', response.data);
      saveToken(response.data.token);

      // Set the success message
      setSuccessMessage('Signup successful!');

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 400) {
        setError('Signup failed. Please check your input and try again.');
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2 className="signup-heading">Signup</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;