import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import TopPost from '../../components/Posts/TopPost';
import PostContent from './../../components/Posts/PostContent';
import { useSelector } from 'react-redux';
import Comments from './../../components/Comments/Comments';

function PostPage({ post }) {
    const router = useRouter();
    const query = router.query;

    const auth = useSelector((state) => state.auth);

    return (
        <Layout title={post.title}>
            <TopPost post={post} auth={auth} isPreview />
            <PostContent post={post} auth={auth} />
            <Comments post={post} />
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
