import React, { useState } from 'react';
import Banner from '../../components/Banner/Banner';
import Title from '../../components/Title/Title';
import Card from '../../components/Card/Card';
import Modal from '../../components/Modal/Modal';
import styles from './index.module.css';
import videosData from '../../data/db.json';

function Home() {
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleEdit = (videoId) => {
        const video = videosData.videos.find(v => v.id === videoId);
        setSelectedVideo(video);
        setSelectedCategory(video.category); // Establecer la categoría seleccionada
        setShowEditForm(true);
    };

    const handleCloseEditForm = () => {
        setSelectedVideo(null);
        setSelectedCategory(''); // Reiniciar la categoría seleccionada al cerrar el formulario
        setShowEditForm(false);
    };

    const handleSaveEdit = (event) => {
        event.preventDefault();

        // Verificar que selectedVideo no sea null antes de acceder a sus propiedades
        if (!selectedVideo) {
            console.error('No hay video seleccionado para editar.');
            return;
        }

        const editedVideo = {
            id: selectedVideo.id,
            title: event.target.editTitle.value,
            category: event.target.editCategory.value,
            image: event.target.editImage.value,
            videoUrl: event.target.editVideoUrl.value,
            description: event.target.editDescription.value,
        };

        // Actualizar el video en el servidor JSON
        fetch(`http://localhost:3001/videos/${editedVideo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedVideo),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Video actualizado:', data);
            handleCloseEditForm();
            window.location.reload(); // Recargar la página para ver los cambios
        })
        .catch(error => console.error('Error actualizando el video:', error));
    };

    const handleDelete = (videoId) => {
        const confirmDelete = window.confirm("¿Está seguro de que desea eliminar este video?");
        if (confirmDelete) {
            fetch(`http://localhost:3001/videos/${videoId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    console.log('Video eliminado');
                    window.location.reload();
                } else {
                    console.error('Error eliminando el video');
                }
            })
            .catch(error => console.error('Error eliminando el video:', error));
        }
    };

    const handleResetForm = () => {
        setSelectedVideo(null); // Resetear el estado de selectedVideo a null
        setSelectedCategory(''); // Resetear la categoría seleccionada
    };
    
    if (!Array.isArray(videosData.videos)) {
        console.error("Error: videosData.videos no es un array.", videosData.videos);
        return null;
    }

    // Agrupar videos por categoría
    const videosByCategory = videosData.categories.map(category => ({
        category: category.name,
        videos: videosData.videos.filter(video => video.category === category.name)
    }));

    return (
        <>
            <Banner />
            <Title>
                <h1>El lugar de tus videos favoritos</h1>
            </Title>
            <section className={styles['section-container']}>
                {videosByCategory.map(category => (
                    <div key={category.category} className={styles['category-container']}>
                        <h2>{category.category}</h2>
                        <div className={styles['videos-list']}>
                            {category.videos.map(video => (
                                <Card key={video.id} {...video} onDelete={handleDelete} onEdit={() => handleEdit(video.id)} />
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Edit Modal */}
            <Modal show={showEditForm} onClose={handleCloseEditForm}>
                <h2>Editar Video</h2>
                <form onSubmit={handleSaveEdit} onReset={handleResetForm}>
                    <div>
                        <label htmlFor="editTitle">Título:</label>
                        <input type="text" id="editTitle" name="editTitle" defaultValue={selectedVideo ? selectedVideo.title : ''} required />
                    </div>
                    <div>
                        <label htmlFor="editCategory">Categoría:</label>
                        <select
                            id="editCategory"
                            name="editCategory"
                            value={selectedCategory}
                            onChange={(event) => setSelectedCategory(event.target.value)}
                            required
                        >
                            <option value="">Seleccione una categoría</option>
                            {videosData.categories.map(category => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="editImage">Imagen URL:</label>
                        <input type="text" id="editImage" name="editImage" defaultValue={selectedVideo ? selectedVideo.image : ''} required />
                    </div>
                    <div>
                        <label htmlFor="editVideoUrl">Video URL:</label>
                        <input type="url" id="editVideoUrl" name="editVideoUrl" defaultValue={selectedVideo ? selectedVideo.videoUrl : ''} required />
                    </div>
                    <div>
                        <label htmlFor="editDescription">Descripción:</label>
                        <textarea id="editDescription" name="editDescription" defaultValue={selectedVideo ? selectedVideo.description : ''} rows="5" required></textarea>
                    </div>
                    <div>
                        <button type="submit">Guardar</button>
                        <button type="reset">Limpiar Formulario</button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default Home;
