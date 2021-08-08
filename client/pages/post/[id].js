import { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import TopPost from '../../components/Posts/TopPost';
import PostContent from './../../components/Posts/PostContent';
import Comments from './../../components/Comments/Comments';
import * as postAPI from '../../api/PostAPI/PostAPI';

function PostPage({ post }) {
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

export async function getServerSideProps({ params: { id }, query }) {
    try {
        const res = await postAPI.getPostById(id);

        return {
            props: {
                post: res.data,
            },
        };
    } catch (err) {}
}

export default PostPage;
