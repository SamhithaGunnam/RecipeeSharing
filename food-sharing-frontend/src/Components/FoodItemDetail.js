import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/FoodItemDetail.css';

const FoodItemDetail = ({ token }) => {
    const { id } = useParams();
    const [recipeDetail, setRecipeDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeDetail = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/recipe_detail/${id}/`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setRecipeDetail(data);
            } catch (error) {
                console.error('Error fetching recipe detail:', error);
                setError('Failed to fetch recipe detail.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetail();
    }, [id, token]);

    const renderIngredients = (ingredientsText) => {
        if (!ingredientsText || typeof ingredientsText !== 'string') {
            return null;
        }

        return ingredientsText.split('\n').map((ingredient, index) => {
            const parts = ingredient.split(' – ');

            if (parts.length > 1) {
                const boldPart = parts[0];
                const rest = parts.slice(1).join(' – ');
                return (
                    <li key={index}>
                        <strong>{boldPart}</strong> – {rest}
                    </li>
                );
            } else {
                return (
                    <li key={index}>
                        <strong>{ingredient}</strong>
                    </li>
                );
            }
        });
    };

    const renderHowToMake = (howToMakeText) => {
        if (!howToMakeText || typeof howToMakeText !== 'string') {
            return null;
        }

        return howToMakeText.split('\n').map((step, index) => (
            <li key={index}>{step}</li>
        ));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!recipeDetail) {
        return <p>No details available.</p>;
    }

    return (
        <div className="food-item-detail">
            <h2 className="foodItem-name">{recipeDetail.food_item_name}</h2>
            {recipeDetail.recipe_image && (
                <img src={`http://127.0.0.1:8000${recipeDetail.recipe_image}`} alt={recipeDetail.food_item_name} />
            )}
            
            <div>
                <h3>Ingredients:</h3>
                <ul>
                    {renderIngredients(recipeDetail.ingredients)}
                </ul>
                <h3>How to Make:</h3>
                <ol>
                    {renderHowToMake(recipeDetail.how_to_make)}
                </ol>
            </div>
        </div>
    );
};

export default FoodItemDetail;
