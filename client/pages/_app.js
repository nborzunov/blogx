import axios from 'axios';
import { createWrapper } from 'next-redux-wrapper';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './../store/store';
import setAuthToken from '../utils/setAuthToken';
import { useRouter } from 'next/router';
import { pageview } from '../utils/gtag';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import tokenService from '../utils/tokenService';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../utils/theme';

function MyApp(props) {
    const { Component, pageProps } = props;
    const router = useRouter();

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
        if (tokenService.getToken()) {
            setAuthToken(tokenService.getToken());
        }
        axios.defaults.baseURL = 'http://localhost:4000/';
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    }, []);

    useEffect(() => {
        const handleRouteChange = (url) => {
            pageview(url, document.title);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    return (
        <React.Fragment>
            <Head>
                <title>Blogx</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <Provider store={store}>
                <ErrorBoundary>
                    <ChakraProvider theme={theme}>
                        <Component {...pageProps} />
                    </ChakraProvider>
                </ErrorBoundary>
            </Provider>
        </React.Fragment>
    );
}

const makeStore = () => store;

const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
