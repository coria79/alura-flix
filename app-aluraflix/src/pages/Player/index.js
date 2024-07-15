import styles from './player.module.css';
import { useParams } from 'react-router-dom';
import data from '../../data/db.json';

function Player() {
    const { id } = useParams();
    const videos = data.videos;
    const video = videos.find(video => video.id === id);

    if (!video) {
        return <div>Video No Encontrado</div>;
    }

    const getEmbedUrl = (url) => {
        const videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        return `https://www.youtube.com/embed/${ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId}`;
    };

    return (
        <>
            <h2>Player</h2>
            <section className={styles.container}>
                <iframe
                    width="75%"
                    height="75%"
                    src={getEmbedUrl(video.videoUrl)}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
                </iframe>
            </section>
        </>
    );
}

export default Player;
