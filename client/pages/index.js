import Link from 'next/link';

const MainPage = () => {
    return (
        <div>
            <Link href="/login">
                <a>login</a>
            </Link>
            <Link href="/signup">
                <a>signup</a>
            </Link>
        </div>
    );
};

export default MainPage;
