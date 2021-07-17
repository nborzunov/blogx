import styled from 'styled-components';
import { Heading, Link, Avatar } from '../UI';

const SidebarWrapper = styled.div`
    width: 300px;
    box-shadow: 0px 8px 30px -10px rgba(13, 28, 39, 0.3);
    padding: 16px;
    & h4 {
        margin-bottom: 8px;
    }
`;

const RecommendedWrapper = styled.div``;
const RecommendedItem = styled.div`
    display: flex;
    align-items: center;
    margin: 8px;
    & h5 {
        margin: 0 8px;
    }
`;
export default function RightSidebar({ profile }) {
    return (
        <>
            {profile.recommended && (
                <SidebarWrapper>
                    <Heading variant="h4">Recommended users </Heading>
                    <RecommendedWrapper>
                        {profile.recommended.map((item) => (
                            <RecommendedItem>
                                <Avatar src={item.avatar} size="small" />{' '}
                                <Heading variant="h5">
                                    {item.name} {item.surname}{' '}
                                </Heading>
                            </RecommendedItem>
                        ))}
                    </RecommendedWrapper>
                </SidebarWrapper>
            )}
        </>
    );
}
