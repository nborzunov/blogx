import { Spinner, Container } from '../../components/UI';
import LargeLayout from './../../components/Layout/LargeLayout';
import ProfileHeader from './../../components/Profile/ProfileHeader';
import LeftSidebar from './../../components/Profile/LeftSidebar';
import ProfileContent from './../../components/Profile/ProfileContent';
import RightSidebar from './../../components/Profile/RightSidebar';
import * as profile from '../../api/ProfileAPI/ProfileAPI';

export default function ProfilePage({ profile, loading = true, error }) {
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

export async function getServerSideProps({ params: { id }, res }) {
    try {
        const res = await profile.getProfileByUserId(id);

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
