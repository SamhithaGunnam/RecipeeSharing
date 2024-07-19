import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';  // Ensure this CSS file is imported

const Home = ({ token }) => {
    const [foodItems, setFoodItems] = useState([]);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/food_items/', {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setFoodItems(data);
            } catch (error) {
                setError('Failed to fetch food items.');
            } finally {
                setLoading(false);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users/');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const usersObject = {};
                data.forEach(user => {
                    usersObject[user.id] = user.username;
                });
                setUsers(usersObject);
            } catch (error) {
                setError('Failed to fetch users.');
            }
        };

        const fetchData = async () => {
            await Promise.all([fetchFoodItems(), fetchUsers()]);
        };

        fetchData();
    }, [token]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="food-items-container">
            {foodItems.map(item => (
                <Link to={`/recipe_detail/${item.id}`} key={item.id} className="food-item">
                    {item.image && <img src={`http://127.0.0.1:8000${item.image}`} alt={item.name} />}
                    <div className="food-item-text">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Home;
