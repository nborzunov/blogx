import styled from 'styled-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../../components/Layout/Layout';
import PostCard from '../../../components/Posts/PostCard';
import { Heading } from '../../../components/UI';
import * as profileAPI from '../../../api/ProfileAPI/ProfileAPI';

const ContentWrapper = styled.div`
    width: 1000px;
    min-height: 620px;
    padding: 24px;
    & h1 {
        margin: 0;
        margin-bottom: 16px;
    }
`;

const PostsGrid = styled.div`
    margin: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
`;

export default function PostsPage(props) {
    const [profile, setProfile] = useState(props);
    if (props.error) {
        return <div>{props.error}</div>;
    }

    const profileId = useSelector((state) => state.auth.profileId);

    return (
        <Layout
            title={`${profile?.user?.name} ${profile?.user?.surname}: posts`}
        >
            <ContentWrapper>
                <Heading variant="h1">{`Posts of of ${profile?.user?.name} ${profile?.user?.surname}`}</Heading>
                <PostsGrid>
                {profile.posts.map((post) => (
                    <PostCard post={post}/>
                ))}
                </PostsGrid>

            </ContentWrapper>
        </Layout>
    );
}

export async function getServerSideProps(req, res) {
    try {
        const res = await profileAPI.getProfileWithPosts(req.params.id);

        if (res.status == 200) {
            console.log('success');
            return {
                props: res.data,
            };
        } else {
            return {
                props: {
                    error: res.data,
                },
            };
        }
    } catch (err) {
        return {
            props: {
                error: err.message,
            },
        };
    }
}
