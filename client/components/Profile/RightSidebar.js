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
    return (
        <>
            {profile.dates && (
                <SidebarWrapper>
                    <Heading variant="h4">Posts due by date </Heading>
                    <DatesWrapper>
                        {profile.dates.map((date) => (
                            <LinkWrapper>
                                <Link
                                    href="/"
                                    title={date + ': '}
                                    size="medium"
                                />{' '}
                                <span>
                                    {Math.random() > 0.5 ? '1 post' : '2 posts'}
                                </span>
                            </LinkWrapper>
                        ))}
                    </DatesWrapper>
                </SidebarWrapper>
            )}
        </>
    );
}
