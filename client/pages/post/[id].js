import {Container, Divider, CssBaseline} from '@material-ui/core';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from '../../components/UI/Footer';
import Header from '../../components/UI/Header';
import MainFeaturedPost from '../../components/Posts/MainFeaturedPost';
import MarkdownUI from '../../components/Posts/Markdown';
import Comments from '../../components/Comments/Comments';
import Head from 'next/head';


const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    if (res.status !== 200) {
        throw new Error(data.message);
    }
    return data;
};

function Post() {
    const router = useRouter();
    const query = router.query;

    const [post, setPost] = useState();

    async function getPost(id) {
        if (id) {
            const res = await axios.get(`/api/post/${id}`);

            setPost(res.data);
        }
    }

    useEffect(() => {
        getPost(query.id);
    }, [query.id]);

    return (
        <>
        <Head>
            <title>{post?.title}</title>
        </Head>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                {post && <MainFeaturedPost post={post} isOnePost={true} />}
                {post?.content && <MarkdownUI content={post.content} />}
                <Divider />
                {post?.comments && <Comments comments={post.comments}/>}
                <Footer />
            </Container>
        </>
    );
}

export default Post;
