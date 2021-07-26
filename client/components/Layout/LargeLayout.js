import styled from 'styled-components';
import Head from 'next/head';
import { Container } from '../UI';
import Footer from './Footer';
import Header from './Header';

const SectionWrapper = styled.div`
    width: 100%;
    box-shadow: 0px 8px 30px -10px rgba(13, 28, 39, 0.3);
    background: #fff;
    border-radius: 12px;
    position: static;
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    margin-bottom: 32px;
`;
const Grid = styled.div`
    display: grid;
    max-width: 1600px;
    min-height: calc(100vh - 200px);
    grid-template-columns: 300px 1000px 300px;
    gap: 16px;
`;
export default function LargeLayout({ title, description, children }) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Container
                maxWidth="fullWidth"
                flexDirection="column"
                alignItems="center"
            >
                <Header />

                <Grid>{children.map((child) => child)}</Grid>

                <Footer />
            </Container>
        </>
    );
}
