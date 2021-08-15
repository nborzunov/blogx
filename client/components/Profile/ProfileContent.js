import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CreatePostCard from '../Posts/CreatePostCard';
import PostCard from '../Posts/PostCard';
import TopPost from '../Posts/TopPost';
import { Button, Heading, Link } from '../UI';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

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
    margin: 16px 16px;
    margin-bottom: 0;
`;

const TabContent = styled.div`
    margin: 0;
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
    const profileId = useSelector((state) => state.auth.profileId);

    return (
        <ProfileContentWrapper>
            {profile.newestPost &&
                profile.mostLikedPost &&
                profile.mostPopularPost && (
                    <>
                        <Tabs colorScheme="purple" variant="enclosed" isFitted>
                            <TabNavigation>
                                <TabList>
                                    <Tab _active={{}}>Newest Post</Tab>
                                    <Tab>Most Liked Post</Tab>
                                    <Tab>Most Popular Post</Tab>
                                </TabList>
                            </TabNavigation>

                            <TabPanels>
                                <TabPanel>
                                    <TabContent>
                                        <TopPost post={profile.newestPost} />
                                    </TabContent>
                                </TabPanel>
                                <TabPanel>
                                    <TopPost post={profile.mostLikedPost} />
                                </TabPanel>
                                <TabPanel>
                                    <TopPost post={profile.mostPopularPost} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </>
                )}
            <PostsCardsWrapper>
                <Heading variant="h1">
                    Posts: <small>{profile.posts.length} posts</small>{' '}
                    <Link href="/" size="medium">
                        All posts..
                    </Link>
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
