import {
    Container,
    CssBaseline,
    Typography,
    Grid,
    TextField,
    Divider,
    Button,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import Footer from '../../components/Layout/Footer';
import Header from '../../components/Layout/Header';
import axios from 'axios';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    divider: {
        margin: '16px 0',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '8px',
    },
    formLabel: {
        paddingRight: '6px',
    },
    uploadImageInput: {
        display: 'none',
    },
    uploadImageButton: {
        display: 'inline-block',
        width: '182px',
        height: '40px',
        '&>*': {
            width: '100%',
        },
    },
}));

export default function Profile({ profile, loading = true, error }) {
    const styles = useStyles();
    const router = useRouter();

    const { isAuth } = useSelector((state) => state.auth);

    const [age, setAge] = useState('');

    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const [image, setImage] = useState('');



    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        const body = {
            age: age,
            country: country,
            city: city,
            avatar: (await toBase64(image))
        }

        try{
            const res = await axios.post('/profile', body);

            if(res.status === 200){
                // router.push('/profile/me');
            } else {
                console.error(res.data.error)
            }
        } catch(err) {
            console.log(err.message)
        }
    }
    return (
        <>
            <Head>
                <title>Create Profile</title>
            </Head>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <Container maxWidth="xs">
                    <Typography
                        component="h1"
                        variant="h3"
                        color="inherit"
                        gutterBottom
                    >
                        Create profile:
                    </Typography>
                    <Grid direction="column">
                        <Container>
                            <form onSubmit={handleFormSubmit}>
                                <div className={styles.row}>
                                    <Typography
                                        component="h5"
                                        variant="h6"
                                        color="inherit"
                                        gutterBottom
                                        className={styles.formLabel}
                                    >
                                        Age:
                                    </Typography>
                                    <TextField
                                        required
                                        placeholder="..."
                                        value={age}
                                        onChange={(e) =>
                                            setAge(e.currentTarget.value)
                                        }
                                    />
                                </div>

                                <Divider className={styles.divider} />

                                <div className={styles.row}>
                                    <Typography
                                        component="h5"
                                        variant="h6"
                                        color="inherit"
                                        gutterBottom
                                        className={styles.formLabel}
                                    >
                                        Country:
                                    </Typography>
                                    <TextField
                                        required
                                        placeholder="..."
                                        value={country}
                                        onChange={(e) =>
                                            setCountry(e.currentTarget.value)
                                        }
                                    />
                                </div>

                                <div className={styles.row}>
                                    <Typography
                                        component="h5"
                                        variant="h6"
                                        color="inherit"
                                        gutterBottom
                                        className={styles.formLabel}
                                    >
                                        City:
                                    </Typography>
                                    <TextField
                                        required
                                        placeholder="..."
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.currentTarget.value)
                                        }
                                    />
                                </div>

                                <Divider className={styles.divider} />

                                <div className={styles.row}>
                                    <Typography
                                        component="h5"
                                        variant="h6"
                                        color="inherit"
                                        gutterBottom
                                        className={styles.formLabel}
                                    >
                                        Profile Image:
                                    </Typography>
                                    <div>
                                        <input
                                            type="file"
                                            id="uploadImage"
                                            className={styles.uploadImageInput}
                                            
                                            onChange={(e) =>
                                                setImage(
                                                    e.currentTarget.files[0]
                                                )
                                            }
                                        />

                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={styles.uploadImageButton}
                                            disabled={!!image}
                                        >
                                            <label htmlFor="uploadImage">
                                                {!!image ? 'Image Uploaded' : 'Upload Image'}
                                            </label>
                                        </Button>
                                    </div>
                                </div>

                                <Divider className={styles.divider} />

                                <Button type='submit'>Submit</Button>
                            </form>
                        </Container>
                    </Grid>
                </Container>

                <Footer />
            </Container>
        </>
    );
}

// export async function getServerSideProps(ctx) {
//     try {
//         const res = await axios.get(`/profile`);
//         if (res.status === 200) {
//             const data = await res.json();
//             return { props: { profile: data, loading: false } };
//         } else {
//             return {
//                 props: { profile: null, loading: false, error: res.data.msg },
//             };
//         }
//     } catch (err) {
//         return { props: { profile: null, loading: false, error: 'Profile not found' } };
//     }
// }
