import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {Outlet} from 'react-router-dom';

function BasePage(){
    return(
        <main>
            <Header/>
                <Container>
                    <Outlet/>
                </Container>
            <Footer/>
        </main>
    );
}

export default BasePage;