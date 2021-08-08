import styled from 'styled-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../../components/Layout/Layout';
import UserCard from '../../../components/Profile/UserCard';
import { Heading } from '../../../components/UI';
import * as profile from '../../../api/ProfileAPI/ProfileAPI';

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
        return <div>{props.error}</div>;
    }

    const profileId = useSelector((state) => state.auth.profileId);
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
                        isAuthor={profile._id == profileId}
                    />
                ))}
            </ContentWrapper>
        </Layout>
    );
}

export async function getServerSideProps(req, res) {
    try {
        const res = await profile.getProfileWithFollowers(req.params.id);

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
