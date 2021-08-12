import styled from 'styled-components';
import { Heading, Link } from '../UI';

const SidebarWrapper = styled.div`
    width: 300px;
    box-shadow: 0px 8px 30px -10px rgba(13, 28, 39, 0.3);
    padding: 16px;
    & h4 {
        margin-bottom: 8px;
    }
`;

const DatesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    & a {
        margin: 8px 0;
        padding: 0;
    }
`;

const LinkWrapper = styled.div`
    margin: 3px 0;
`;
export default function RightSidebar({ profile }) {
    function fillDatesWrapper() {
        let result = [];
        for (let key in profile.dates) {
            result.push(
                <LinkWrapper key={key}>
                    <Link href="/" size="medium">
                        {key + ': '}
                    </Link>{' '}
                    <span>{`${profile.dates[key]} posts`}</span>
                </LinkWrapper>
            );
        }
        return result;
    }
    return (
        <>
            {profile.dates && (
                <SidebarWrapper>
                    <Heading variant="h4">Posts due by date </Heading>
                    <DatesWrapper>{fillDatesWrapper()}</DatesWrapper>
                </SidebarWrapper>
            )}
        </>
    );
}
