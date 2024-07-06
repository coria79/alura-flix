import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../../data/db.json';
import styles from './newVideo.module.css'; // Importa el módulo CSS

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
        fetch('http://localhost:3001/categories')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    console.error('Error: categories data is not an array', data);
                }
            })
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
        fetch('http://localhost:3001/videos', {
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
        <div className={styles["new-video-container"]}> {/* Utiliza la sintaxis de módulos CSS */}
            <h2>Crear Nuevo Video</h2>
            <p>Complete el formulario para crear una nueva tarjeta de video.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Video Título:</label>
                </div>
                <div>
                    <input type="text" id="title" name="title" required />
                </div>
                <div>
                    <label htmlFor="category">Categoría:</label>
                </div>
                <div>
                    <select id="category" name="category" required>
                        <option value="">Seleccione una categoría</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="image">Imagen URL:</label>
                </div>
                <div>
                    <input type="text" id="image" name="image" defaultValue="/img/logo-youtube.jpg" required/>
                </div>
                <div>
                    <label htmlFor="videoUrl">Video URL:</label>
                </div>
                <div>
                    <input type="url" id="videoUrl" name="videoUrl" required />
                </div>
                <div>
                    <label htmlFor="description">Descripción:</label>
                </div>
                <div>
                    <textarea className={styles["txt-description"]} id="description" name="description" rows="5" required></textarea> {/* Utiliza la sintaxis de módulos CSS */}
                </div>
                <div>
                    <button type="submit">Crear</button>
                    <button type="reset">Limpiar Campos</button>
                </div>
            </form>
        </div>
    );
}

export default NewVideo;