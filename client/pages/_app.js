import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import { createWrapper } from 'next-redux-wrapper';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import theme from '../src/theme';
import store from './../store/store';
import setAuthToken from '../utils/setAuthToken';
import '../styles/globals.css';

function MyApp(props) {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
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

    return (
        <React.Fragment>
            <Head>
                <title>My page</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </ThemeProvider>
        </React.Fragment>
    );
}

const makeStore = () => store;

const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
