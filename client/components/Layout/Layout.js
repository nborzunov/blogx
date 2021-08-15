import styled from 'styled-components';
import Head from 'next/head';
import { Flex } from '@chakra-ui/react';
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
const ContentWrapper = styled.div`
    margin-top: 100px;
    min-height: calc(100vh - 285px);
`;
export default function Layout({ title, description, children }) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Flex
                minWidth="100%"
                minHeight="100vh"
                flexDirection="column"
                alignItems="center"
                p="0"
            >
                <Header />
                <ContentWrapper>
                    {!Array.isArray(children) ? (
                        <SectionWrapper>{children}</SectionWrapper>
                    ) : (
                        <>
                            {children.map((child, id) => (
                                <SectionWrapper key={id}>
                                    {child}
                                </SectionWrapper>
                            ))}
                        </>
                    )}
                </ContentWrapper>

                <Footer />
            </Flex>
        </>
    );
}
