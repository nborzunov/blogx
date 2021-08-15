import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    styles: {
        global: {
            'html, body': {
                padding: 0,
                margin: 0,
                fontSize: '16px',
                position: 'relative',
                fontFamily: `'Roboto', sans-serif !important`,
            },
            body: {
                maxWidth: '100vw',
                maxHeight: '100vh',
                overflow: 'hidden',
                overflowY: 'scroll',
            },
            '*': {
                boxSizing: 'border-box',
            },
        },
    },
    colors: {
        light: {
            primary: '#2196F3',
            secondary: '#6C44FC',
            blue: '#2196F3',
            gray: '#001D4A',
        },
    },
    components: {
        Button: {
            variants: {
                submit: (props) => ({
                    bg:
                        props.colorMode === 'dark'
                            ? 'light.primary'
                            : 'light.primary',
                    color: 'white',
                    _hover: {
                        opacity: 0.8,
                        _disabled: {
                            bg: 'light.primary',
                            opacity: 0.8,
                        },
                    },
                    _disabled: {
                        opacity: 0.8,
                    },
                }),
            },
        },
    },
});

export default theme;
