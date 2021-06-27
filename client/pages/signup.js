import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useState } from 'react';
import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import setAuthToken from '../utils/setAuthToken';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Signup = () => {
    const classes = useStyles();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: {
            value: '',
            error: null,
        },
        password: {
            value: '',
            error: '',
        },
    });

    async function handleFormSubmit(e) {
        e.preventDefault();
        console.log('123');
        try {
            const body = JSON.stringify({
                name: formData.name,
                surname: formData.surname,
                email: formData.email.value,
                password: formData.password.value,
            });

            const config = {
                headers: { 'Content-Type': 'application/json' },
            };
            const res = await axios.post(
                'http://localhost:4000/auth/signup',
                body,
                config
            );

            if (res.status !== 200) {
                console.error(res);
            } else {
                document.cookie = `token=${res.data.token}`;

                setAuthToken(res.data.token);

                router.push('/');
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <>
            <Container component="main" maxWidth="xl" className="wrapper">
                <Header />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>{' '}
                        <Typography component="h1" variant="h5">
                            Sign up{' '}
                        </Typography>{' '}
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={(e) => handleFormSubmit(e)}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={formData.name}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                name: e.currentTarget.value,
                                            });
                                        }}
                                    />{' '}
                                </Grid>{' '}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                        value={formData.surname}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                surname: e.currentTarget.value,
                                            });
                                        }}
                                    />{' '}
                                </Grid>{' '}
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={formData.email.value}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                email: {
                                                    ...formData.email,
                                                    value: e.currentTarget
                                                        .value,
                                                },
                                            });
                                        }}
                                    />{' '}
                                </Grid>{' '}
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={formData.password.value}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                password: {
                                                    ...formData.password,
                                                    value: e.currentTarget
                                                        .value,
                                                },
                                            });
                                        }}
                                    />{' '}
                                </Grid>{' '}
                            </Grid>
                            {/* <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up{' '}
                            </Button>{' '}
                            <Grid container>
                                {' '}
                                {/* <Grid item xs>
                                        <UILink href="#" variant="body2">
                                            Forgot password?
                                        </UILink>
                                    </Grid> */}{' '}
                                <Grid item>
                                    <Link variant="body2" href="/signup">
                                        {' '}
                                        {
                                            'Already have an account? Sign in'
                                        }{' '}
                                    </Link>{' '}
                                </Grid>{' '}
                            </Grid>{' '}
                        </form>{' '}
                    </div>{' '}
                </Container>{' '}
                <Footer />
            </Container>{' '}
            <style jsx>
                {`
                    .wrapper {
                        display: flex;
                    }
                `}
            </style>
        </>
    );
};

export default Signup;
