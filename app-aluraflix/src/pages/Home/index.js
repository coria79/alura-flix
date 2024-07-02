import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import Footer from '../../components/Footer/Footer';
import Title from '../../components/Title/Title';
import Card from '../../components/Card/Card';
import styles from './index.module.css';
import videos from '../../data/db.json';

function Home() {
    return (
        <>
            <Header />
            <Banner />
            <Title>
                <h1>El lugar de tus videos favoritos</h1>
            </Title>
            <section className={styles['section-container']}>
                {
                    videos.map((video) => { return <Card {...video} key={video.id}/> })
                }
            </section>
            <Footer />
        </>
    );
}

export default Home;