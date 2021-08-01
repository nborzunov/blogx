import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import TopPost from '../../components/Posts/TopPost';
import PostContent from './../../components/Posts/PostContent';
import { useSelector } from 'react-redux';
import Comments from './../../components/Comments/Comments';
import {useState} from 'react';

function PostPage({ post }) {
    const router = useRouter();
    const query = router.query;

    const [currentPost, setPost] = useState(post);

    const auth = useSelector((state) => state.auth);

    return (
        <Layout title={post.title}>
            <TopPost post={currentPost} setPost={setPost} isPreview />
            <PostContent post={currentPost} auth={auth} />
            <Comments post={currentPost} />
        </Layout>
    );
}

export async function getServerSideProps({ params, query }) {
    try {
        const res = await axios.get(`http://localhost:4000/post/${params.id}`);

        return {
            props: {
                post: res.data,
            },
        };
    } catch (err) {}
}

export default PostPage;
