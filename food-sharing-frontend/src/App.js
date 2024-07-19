import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import FoodItemDetail from './Components/FoodItemDetail';
import Submit from './Components/Submit';
import { AuthProvider } from './context/authContext';

const App = () => {
    return (
        <AuthProvider>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/log-in" element={<Login />} />
                    <Route path="/recipe_detail/:id" element={<FoodItemDetail />} />
                    <Route path="/submit" element={<Submit />} />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;