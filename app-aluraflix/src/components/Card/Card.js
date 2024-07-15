import React from 'react';
import styles from './Card.module.css';
import iconDelete from './iconCandyTrash32x32.png';
import iconEdit from './iconEdit32x32.png';
import { Link } from 'react-router-dom';

function Card({id, image, title, onDelete, onEdit}){

    //Event onClick to delete the video.
    const handleDelete = () => {
        console.log(`Eliminar video con ID ${id}`);
        onDelete(id); // Llamar a la función onDelete proporcionada
    };
    
    //Event onClick to edit the video.
    const handleEdit = () => {
        console.log(`Editar video con ID ${id}`);
        onEdit(id); // Llamar a la función onEdit proporcionada
    };
    
    return(
        <div className={styles.container}>
            <Link className={styles.link} to={`/${id}`}>
                <img src={image} alt={title} className={styles.image} />
                <h2>{title}</h2>
            </Link>
            <div>
                <button className={styles.deleteButton} onClick={handleDelete}>
                    <img src={iconDelete} alt="Icono Borrar" className={styles.delete} />
                </button>
                <button className={styles.editButton} onClick={handleEdit}>
                    <img src={iconEdit} alt="Icono Editar" className={styles.delete} />
                </button>
            </div>
        </div>
    );
}

export default Card;