import React from 'react';
import Banner from '../../components/Banner/Banner';
import Title from '../../components/Title/Title';
import Card from '../../components/Card/Card';
import styles from './index.module.css';
import videosData from '../../data/db.json';

function Home() {
    // Check if videosData.videos is an array before using map
    if (!Array.isArray(videosData.videos)) {
        console.error("Error: videosData.videos no es un array.", videosData.videos);
        return null; // Or display an appropriate error message
    }

    return (
        <>
            <Banner />
            <Title>
                <h1>El lugar de tus videos favoritos</h1>
            </Title>
            <section className={styles['section-container']}>
                {videosData.videos.map(video => (
                    <Card key={video.id} {...video} />
                ))}
            </section>
        </>
    );
}

export default Home;