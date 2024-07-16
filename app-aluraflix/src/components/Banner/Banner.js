import React from 'react';
import styles from './Banner.module.css';
import banner from './banner.png';
import Card from '../MiniCard/MiniCard';

// Importa db.json o usa la información de videos desde el estado si ya está cargada
import db from '../../data/db.json';

function Banner() {
    // Lógica para obtener un video aleatorio
    const getRandomVideo = () => {
        const randomIndex = Math.floor(Math.random() * db.videos.length);
        return db.videos[randomIndex];
    };

    // Obtén un video aleatorio al montar el componente
    const randomVideo = getRandomVideo();

    return (
        <div className={styles.banner}>
            <div className={styles.miniVidCard} style={{backgroundImage: `url(${banner})`}}>
                <div className={styles.videoInfo}>
                    <h2>{randomVideo.category}</h2>
                    <h4>{randomVideo.title}</h4>
                    <p>{randomVideo.description}</p>
                </div>
                <Card
                    id={randomVideo.id}
                    image={randomVideo.image}
                />
            </div>
        </div>
    );
}

export default Banner;