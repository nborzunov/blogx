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
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';
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

const Login = ({ props }) => {
    const router = useRouter();
    const classes = useStyles();

    const [formData, setFormData] = useState({
        email: {
            value: '',
            error: null,
        },
        password: {
            value: '',
            error: null,
        },
    });

    async function handleFormSubmit(e) {
        e.preventDefault();

        try {
            const body = JSON.stringify({
                email: formData.email.value,
                password: formData.password.value,
            });

            const config = {
                headers: { 'Content-Type': 'application/json' },
            };
            const res = await axios.post(
                'http://localhost:4000/auth/login',
                body,
                config
            );

            if (res.status !== 200) {
                console.log(res.data);
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
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={handleFormSubmit}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={formData.email.value}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        email: {
                                            ...formData.email,
                                            value: e.currentTarget.value,
                                        },
                                    });
                                }}
                            />
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
                                            value: e.currentTarget.value,
                                        },
                                    });
                                }}
                            />
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
                                Sign In
                            </Button>
                            <Grid container>
                                {/* <Grid item xs>
                            <Link href="/signup">
                                <UILink href="#" variant="body2">
                                    {'Forgot password?'}
                                </UILink>
                            </Link>
                        </Grid> */}
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
                <Footer />
            </Container>
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

export default Login;
