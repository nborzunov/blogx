import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import FeaturedPost from '../components/Posts/FeaturedPost';
import MainFeaturedPost from '../components/Posts/MainFeaturedPost';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

function Posts({ props }) {
    const [posts, setPosts] = useState([]);
    const classes = useStyles();

    async function getPosts() {
        const res = await axios.get('/api/posts');
        setPosts(res.data);
    }
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <main>
                    {posts[0] && <MainFeaturedPost post={posts[0]} />}
                    <Grid container spacing={4}>
                        {posts.slice(1, posts.length - 1).map((post) => (
                            <FeaturedPost key={post.id} post={post} />
                        ))}
                    </Grid>
                </main>
                <Footer />
            </Container>
        </>
    );
}

export default Posts;
