import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CreatePostCard from '../Posts/CreatePostCard';
import PostCard from '../Posts/PostCard';
import TopPost from '../Posts/TopPost';
import { Button, Heading, Link } from '../UI';

const ProfileContentWrapper = styled.div`
    width: 100%;
    box-shadow: 0px 8px 30px -10px rgba(13, 28, 39, 0.3);
    background: #fff;
    border-radius: 12px;
    position: static;
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    margin-bottom: 32px;
`;

const TabNavigation = styled.div`
    margin: 16px 24px;
`;

const TabContent = styled.div`
    margin: 0 24px;
    & img {
        height: 350px;
    }
`;

const PostsCardsWrapper = styled.div`
    margin-top: 32px;
`;
const PostsGrid = styled.div`
    margin: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
`;

export default function ProfileContent({ profile }) {
    const [currentTab, setCurrentTab] = useState(0);

    const profileId = useSelector(state => state.auth.profileId);

    const choosenPosts = [
        profile.newestPost,
        profile.mostLikedPost,
        profile.mostPopularPost,
    ];

    return (
        <ProfileContentWrapper>
            {profile.newestPost &&
                profile.mostLikedPost &&
                profile.mostPopularPost && (
                    <>
                        <TabNavigation>
                            <Button
                                variant="tab"
                                active={currentTab === 0}
                                onClick={(e) => setCurrentTab(0)}
                            >
                                Newest Post
                            </Button>
                            <Button
                                variant="tab"
                                active={currentTab === 1}
                                onClick={(e) => setCurrentTab(1)}
                            >
                                Most Liked Post
                            </Button>
                            <Button
                                variant="tab"
                                active={currentTab === 2}
                                onClick={(e) => setCurrentTab(2)}
                            >
                                Most Popular Post
                            </Button>
                        </TabNavigation>
                        <TabContent>
                            <TopPost post={choosenPosts[currentTab]} />
                        </TabContent>
                    </>
                )}
            <PostsCardsWrapper>
                <Heading variant="h1">
                    Posts: <small>{profile.posts.length} posts</small>{' '}
                    <Link title="All posts.." href="/" size="medium" />
                </Heading>
                <PostsGrid>
                    {profile.posts.map((post) => (
                        <PostCard post={post} />
                    ))}
                    {profile.id == profileId && <CreatePostCard />}
                </PostsGrid>
            </PostsCardsWrapper>
        </ProfileContentWrapper>
    );
}
