import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import Layout from '../../../components/Layout/Layout';
import UserCard from '../../../components/Profile/UserCard';
import { Heading } from '../../../components/UI';

const ContentWrapper = styled.div`
    width: 1000px;
    min-height: 620px;
    padding: 24px;
    & h1 {
        margin: 0;
        margin-bottom: 16px;
    }
`;

export default function FollowersPage(props) {
    const [profile, setProfile] = useState(props.profile);
    if (props.error) {
        return <div>{error}</div>;
    }

    return (
        <Layout
            title={`${profile?.user?.name} ${profile?.user?.surname}: followers`}
        >
            <ContentWrapper>
                <Heading variant="h1">{`Followers of ${profile?.user?.name} ${profile?.user?.surname}`}</Heading>
                {props.followers.map((follower) => (
                    <UserCard
                        profile={follower}
                        setProfile={setProfile}
                        isFollowing={profile.following.includes(follower._id)}
                    />
                ))}
            </ContentWrapper>
        </Layout>
    );
}

export async function getServerSideProps(req, res) {
    try {
        const res = await axios.get(
            `http://localhost:4000/profile/${req.params.id}/followers`
        );

        if (res.status == 200) {
            console.log('success');
            return {
                props: {
                    profile: res.data.profile,
                    followers: res.data.followers,
                },
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
