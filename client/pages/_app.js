import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import { createWrapper } from 'next-redux-wrapper';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import theme from '../utils/theme';
import store from './../store/store';
import setAuthToken from '../utils/setAuthToken';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { pageview } from '../utils/gtag';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

function MyApp(props) {
    const { Component, pageProps } = props;
    const router = useRouter();

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        axios.defaults.baseURL = 'http://localhost:4000/';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
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
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Provider store={store}>
                    <ErrorBoundary>
                        <Component {...pageProps} />
                    </ErrorBoundary>
                </Provider>
            </ThemeProvider>
        </React.Fragment>
    );
}

const makeStore = () => store;

const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
