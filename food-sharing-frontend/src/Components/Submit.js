import React, { useState } from 'react';
import axios from 'axios';
import '../css/SubmitRecipe.css'; // Import your CSS file

const Submit = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null,
        ingredients: '',
        how_to_make: '',
        // Remove 'submitted_by' or set to a default value if not required
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('image', formData.image); // Make sure formData.image is the file object
        data.append('recipe_detail.ingredients', formData.ingredients);
        data.append('recipe_detail.how_to_make', formData.how_to_make);
        // Remove 'submitted_by' if not required

        try {
            console.log('Submitting without token'); // Debug log
            const response = await axios.post('http://127.0.0.1:8000/api/create_food_item/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Remove 'Authorization' header
                }
            });
            console.log('Response data:', response.data);
            setSuccessMessage('Recipe submitted successfully!');
            setTimeout(() => {
                window.location.href = '/'; // Redirect to homepage after 2 seconds
            }, 2000);
        } catch (error) {
            console.error('Error submitting recipe:', error.response ? error.response.data : error.message);
            // Handle error, e.g., show an error message
        }
    };

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        if (name === 'image') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div className="submit-recipe-container">
            <div className="background-container">
                <div className="form-container">
                    <h2 className="form-heading">Submit Recipe</h2>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Image:</label>
                            <input type="file" name="image" onChange={handleInputChange} accept="image/*" required />
                        </div>
                        <div className="form-group">
                            <label>Ingredients:</label>
                            <textarea name="ingredients" value={formData.ingredients} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>How to Make:</label>
                            <textarea name="how_to_make" value={formData.how_to_make} onChange={handleInputChange} required />
                        </div>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Submit;