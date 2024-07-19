import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(localStorage.getItem('user') || null);

    useEffect(() => {
        // Update axios default headers when token changes
        console.log('Setting Axios token:', token); // Debug log
        axios.defaults.headers.common['Authorization'] = token ? `Token ${token}` : '';
    }, [token]);

    const saveToken = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const saveUser = (newUser) => {
        localStorage.setItem('user', newUser);
        setUser(newUser);
    };

    const removeToken = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, saveToken, removeToken, user, saveUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
