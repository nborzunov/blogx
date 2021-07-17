import Link from 'next/link';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { Container } from '../components/UI';

const MainPage = () => {
    return (
        <>
            <Container fullWidth flexDirection="column" alignItems="center">
                <Header />
                <Container maxWidth="lg">
                    <Container maxWidth="sm"></Container>
                    <Container maxWidth="md">
                    </Container>
                    <Container maxWidth="sm"></Container>
                </Container>
                <Footer />
            </Container>
        </>
    );
};

export default MainPage;
