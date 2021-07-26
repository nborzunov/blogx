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

export default function ProfilePage({ profile, loading = true, error }) {
    const router = useRouter();

    profile = {
        user: {
            name: 'Nikolay',
            surname: 'Borzunov',
        },
        country: 'Russia',
        city: 'Voronezh',
        age: 18,
        posts: [],
        avatar: 'https://source.unsplash.com/random',
        followers: 1598,
        following: 65,
        posts: 123,
        comments: 564,
        socials: {
            facebook: 'fsafsa',
            twitter: 'fasfsaf',
            instagram: 'fafas',
            website: 'afsfsafa',
        },
        dates: [
            'January 2019',
            'May 2019',
            'September 2019',
            'December 2019',
            'January 2020',
            'February 2020',
            'April 2020',
            'July 2020',
            'October 2020',
            'January 2021',
            'Marth 2021',
        ],
        recommended: [
            {
                name: 'Andrey',
                surname: 'Andreev',
                avatar: 'https://source.unsplash.com/random',
            },
            {
                name: 'Andrey',
                surname: 'Andreev',
                avatar: 'https://source.unsplash.com/random',
            },
            {
                name: 'Andrey',
                surname: 'Andreev',
                avatar: 'https://source.unsplash.com/random',
            },
            {
                name: 'Andrey',
                surname: 'Andreev',
                avatar: 'https://source.unsplash.com/random',
            },
            {
                name: 'Andrey',
                surname: 'Andreev',
                avatar: 'https://source.unsplash.com/random',
            },
        ],
        newestPost: {
            id: 1,
            title: 'Lorem Ipsum is simply dummy 1',
            subtitle:
                'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
            previewImage: 'https://source.unsplash.com/random',
            views: 21357,
            likes: 3421,
            comments: 398,
        },
        mostLikedPost: {
            id: 1,
            title: 'Lorem Ipsum is simply dummy 2',
            subtitle:
                'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
            previewImage: 'https://source.unsplash.com/random',
            views: 21357,
            likes: 3421,
            comments: 398,
        },
        mostPopularPost: {
            id: 1,
            title: 'Lorem Ipsum is simply dummy 3',
            subtitle:
                'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
            previewImage: 'https://source.unsplash.com/random',
            views: 21357,
            likes: 3421,
            comments: 398,
        },
        posts: [
            {
                id: 1,
                title: 'Lorem Ipsum is simply dummy',
                subtitle:
                    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
                previewImage: 'https://source.unsplash.com/random',
                views: 21357,
                likes: 3421,
                comments: 398,
                date: 1625812615279,
            },
            {
                id: 1,
                title: 'Lorem Ipsum is simply dummy',
                subtitle:
                    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
                previewImage: 'https://source.unsplash.com/random',
                views: 21357,
                likes: 3421,
                comments: 398,
                date: 1625812615279,
            },
            {
                id: 1,
                title: 'Lorem Ipsum is simply dummy',
                subtitle:
                    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
                previewImage: 'https://source.unsplash.com/random',
                views: 21357,
                likes: 3421,
                comments: 398,
                date: 1625811111279,
            },
            {
                id: 1,
                title: 'Lorem Ipsum is simply dummy',
                subtitle:
                    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
                previewImage: 'https://source.unsplash.com/random',
                views: 21357,
                likes: 3421,
                comments: 398,
                date: 1625812611279,
            },
            {
                id: 1,
                title: 'Lorem Ipsum is simply dummy',
                subtitle:
                    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
                previewImage: 'https://source.unsplash.com/random',
                views: 21357,
                likes: 3421,
                comments: 398,
                date: 1625812115279,
            },
            {
                id: 1,
                title: 'Lorem Ipsum is simply dummy',
                subtitle:
                    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
                previewImage: 'https://source.unsplash.com/random',
                views: 21357,
                likes: 3421,
                comments: 398,
                date: 1625812611279,
            },
            {
                id: 1,
                title: 'Lorem Ipsum is simply dummy',
                subtitle:
                    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
                previewImage: 'https://source.unsplash.com/random',
                views: 21357,
                likes: 3421,
                comments: 398,
                date: 1625812615279,
            },
            {
                id: 1,
                title: 'Lorem Ipsum is simply dummy',
                subtitle:
                    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
                previewImage: 'https://source.unsplash.com/random',
                views: 21357,
                likes: 3421,
                comments: 398,
                date: 1625812215279,
            },
            {
                id: 1,
                title: 'Lorem Ipsum is simply dummy',
                subtitle:
                    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,',
                previewImage: 'https://source.unsplash.com/random',
                views: 21357,
                likes: 3421,
                comments: 398,
                date: 1625812615279,
            },
        ],
    };

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
