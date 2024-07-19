import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Import useAuth hook
import '../css/Login.css';

const Login = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // State for success message
    const [isLoading, setIsLoading] = useState(false);
    const { saveToken, saveUser } = useAuth(); // Access saveToken and saveUser from context
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { username, password } = event.target.elements;

        setIsLoading(true);
        setSuccess(null); // Reset success message before making request

        try {
            const response = await fetch('http://localhost:8000/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value
                })
            });

            if (!response.ok) {
                const errorText = await response.text(); // Get the response text
                throw new Error(errorText);
            }

            const data = await response.json();
            saveToken(data.access); // Save access token to context
            saveUser(username.value); // Save user info to context
            setError(null);
            setSuccess('Login successful!'); // Set success message

            // Hide success message after 3 seconds and then refresh the page
            setTimeout(() => {
                setSuccess(null);
                window.location.reload(); // Refresh the page
            }, 500);

        } catch (error) {
            console.error('Error logging in:', error.message);
            setError('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="background-container">
                <div className="login-form-container">
                    <div className="header-container">
                        <h2 className="login-heading">Login</h2>
                        {success && <p className="success-message">{success}</p>} {/* Display success message */}
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <button type="submit" className="login-button" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;