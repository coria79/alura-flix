import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import NewVideo from '../../pages/NewVideo';
import {Outlet} from 'react-router-dom';

function BasePage(){
    return(
        <main>
            <Header/>
                <Container>
                    <Outlet/>
                    <NewVideo/>
                </Container>
            <Footer/>
        </main>
    );
}

export default BasePage;