import styled from 'styled-components';
import { Heading, Button, Link } from '../UI';
import Slider from 'react-slick';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
import Image from 'next/image';
import moment from 'moment';
import TopPost from '../Posts/TopPost';

const ProfileContentWrapper = styled.div`
    width: 100%;
    box-shadow: 0px 8px 30px -10px rgba(13, 28, 39, 0.3);
    background: #fff;
    border-radius: 12px;
    position: static;
    display: flex;
    flex-direction: column;
    min-height: 1000px;
    max-width: 1000px;
    margin-bottom: 32px;
`;

const TabNavigation = styled.div`
    margin: 16px 24px;
`;

const TabContent = styled.div`
    margin: 0 24px;
`;


const StyledImage = styled(Image)`
    background: red;
    object-fit: cover;
    -webkit-filter: brightness(90%);
    z-index: 1000;
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

const PostCard = styled.div`
    height: 180px;
    box-shadow: 0px 3px 9px rgba(43, 98, 169, 0.5);
    display: flex;
`;
const PostInfo = styled.div`
    width: 316px;
    height: 180px;
    padding: 16px;
    & h5 {
        margin: 4px 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 90%;
    }
    & h6 {
        color: #666;
        margin: 4px 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; /* number of lines to show */
        line-height: 20px; /* fallback */
        max-height: 60px;
        width: 80%;
    }
    & a {
        margin: 4px 8px;
        padding: 0;
    }
`;
const PostInfoDate = styled.div`
    & h6 {
        color: #888;
    }
`;

export default function ProfileContent({ profile }) {
    const [currentTab, setCurrentTab] = useState(0);

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
                            <TopPost post={choosenPosts[currentTab]}/>
                        </TabContent>
                    </>
                )}
            <PostsCardsWrapper>
                <Heading variant="h1">
                    Posts: <small>{profile.posts.length} posts</small> <Link title='All posts..' href='/' size='medium' />
                </Heading>
                <PostsGrid>
                    {profile.posts.map((post) => (
                        <PostCard>
                            <PostInfo>
                                <Heading variant="h5">{post.title}</Heading>
                                

                                <Heading variant="h6">{post.subtitle}</Heading>

                                <PostInfoDate>
                                    <Heading variant="h6">
                                        {moment().startOf(post.date).fromNow()}
                                    </Heading>
                                </PostInfoDate>

                                <Link src="/" title="Read more.." size="small" />
                            </PostInfo>
                            <StyledImage
                                src={post.previewImage}
                                width={150}
                                height={140}
                            />
                        </PostCard>
                    ))}
                </PostsGrid>
            </PostsCardsWrapper>
        </ProfileContentWrapper>
    );
}
