import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../../data/db.json';

function NewVideo() {
    const [categories, setCategories] = useState([]); // State for categories
    const navigate = useNavigate();

    // Load categories from db.json in initial mount
    useEffect(() => {
        if (db && db.categories) {
            setCategories(db.categories);
        }
    }, []);


    // Fetch categories from the JSON server on component mount
    useEffect(() => {
        fetch('http://localhost:3000/categories')
            .then(response => response.json())
            .then(data => setCategories(data.categories))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form behavior

        // Get form values
        const newVideo = {
            title: event.target.title.value,
            category: event.target.category.value,
            image: event.target.image.value,
            videoUrl: event.target.videoUrl.value,
            description: event.target.description.value,
        };

        // Send a POST request to create a new video
        fetch('http://localhost:3000/videos', {
            method: 'POST', // Indicate that this is a POST request
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify(newVideo), // Convert the object to JSON
        })
        .then(response => response.json()) // Process the server response
        .then(data => {
            console.log('Video created:', data); // Show success message
            navigate('/'); // Redirect to the home page
        })
        .catch(error => {
            console.error('Error creating video:', error); // Handle errors
        });
    };

    return (
        <>
            <h2>Create New Video</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Video Title:</label>
                    <input type="text" id="title" name="title" required />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select id="category" name="category" required>
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="image">Image URL:</label>
                    <input type="url" id="image" name="image" required />
                </div>
                <div>
                    <label htmlFor="videoUrl">Video URL:</label>
                    <input type="url" id="videoUrl" name="videoUrl" required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" required></textarea>
                </div>
                <div>
                    <button type="submit">Create</button>
                    <button type="reset">Clear Fields</button>
                </div>
            </form>
        </>
    );
}

export default NewVideo;