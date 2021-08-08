import axios from 'axios';
import styled from 'styled-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
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
    const [profile, setProfile] = useState(props);
    if (props.error) {
        return <div>{props.error}</div>;
    }

    const profileId = useSelector((state) => state.auth.profileId);

    return (
        <Layout
            title={`${profile?.user?.name} ${profile?.user?.surname}: following`}
        >
            <ContentWrapper>
                <Heading variant="h1">{`Following users of ${profile?.user?.name} ${profile?.user?.surname}`}</Heading>
                {profile.following.map((follower) => (
                    <UserCard
                        profile={follower}
                        setProfile={setProfile}
                        isFollowing={profile.following.some(
                            (item) => item._id == follower._id
                        )}
                        isAuthor={profile._id == profileId}
                    />
                ))}
            </ContentWrapper>
        </Layout>
    );
}

export async function getServerSideProps(req, res) {
    try {
        const res = await axios.get(
            `http://localhost:4000/profile/${req.params.id}/following`
        );

        if (res.status == 200) {
            console.log('success');
            let { following, ...profile } = res.data;
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
