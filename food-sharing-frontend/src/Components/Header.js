import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import '../css/Home.css';

const Header = () => {
    const { token, removeToken, user } = useAuth();

    const handleLogout = () => {
        removeToken();
    };

    return (
        <div className="outer-box">
            <div className="inner-box">
                <div className="links-container">
                    <div className="left-links">
                        <Link to="/" className="link">Home</Link>
                        {token ? (
                            <>
                                <span className="username">Hi, {user}</span>
                                <span className="link logout-link" onClick={handleLogout}>Logout</span>
                            </>
                        ) : (
                            <>
                                <Link to="/log-in" className="link">Login</Link>
                                <Link to="/signup" className="link">SignUp</Link>
                            </>
                        )}
                        <Link to="/submit" className="link">Submit</Link>
                    </div>
                    <h2 className="heading">Sam's Recipes</h2>
                </div>
            </div>
        </div>
    );
};

export default Header;
