import Banner from '../../components/Banner/Banner';
import Title from '../../components/Title/Title';
import Card from '../../components/Card/Card';
import styles from './index.module.css';
import videos from '../../data/db.json';

function Home() {
    return (
        <>
            <Banner />
            <Title>
                <h1>El lugar de tus videos favoritos</h1>
            </Title>
            <section className={styles['section-container']}>
                {
                    videos.map((video) => { return <Card {...video} key={video.id}/> })
                }
            </section>
        </>
    );
}

export default Home;