import { Container } from '../../components/UI';
import { useRouter } from 'next/router';
import Footer from '../../components/Layout/Footer';
import Header from '../../components/Layout/Header';
import axios from 'axios';
import Head from 'next/head';
import { Spinner } from '../../components/UI';
import LargeLayout from './../../components/Layout/LargeLayout';
import ProfileHeader from './../../components/Profile/ProfileHeader';
import LeftSidebar from './../../components/Profile/LeftSidebar';
import ProfileContent from './../../components/Profile/ProfileContent';
import RightSidebar from './../../components/Profile/RightSidebar';

function ProfilePage({ profile, loading = true, error }) {
    const router = useRouter();

    

    return (
        <LargeLayout
            title={`Profile: ${profile?.user?.name} ${profile?.user?.surname}`}
        >
            {!loading && profile && (
                <>
                    <Container maxWidth="sm"></Container>
                    <Container maxWidth="md">
                        <ProfileHeader profile={profile} />
                    </Container>
                    <Container maxWidth="sm"></Container>

                    <Container maxWidth="sm">
                        <LeftSidebar profile={profile} />
                    </Container>
                    <Container maxWidth="md">
                        <ProfileContent profile={profile} />
                    </Container>
                    <Container maxWidth="sm">
                        <RightSidebar profile={profile} />
                    </Container>
                </>
            )}
            {loading && <Spinner />}
            {!loading && error}
        </LargeLayout>
    );
}

export async function getServerSideProps({ params, res }) {
    try {
        const { id } = params;

        const res = await axios.get(`http://localhost:4000/profile/${id}`);
        if (res.status === 200) {
            return { props: { profile: res.data, loading: false } };
        } else {
            return {
                props: { profile: null, loading: false, error: res.data.msg },
            };
        }
    } catch (err) {
        return {
            props: {
                profile: null,
                loading: false,
                error: err.message,
            },
        };
    }
}
