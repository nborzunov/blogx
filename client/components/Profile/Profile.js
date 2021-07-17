import styled from 'styled-components';
import { Container } from '../UI';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';
const Grid = styled.div`
    display: grid;
    max-width: 1600px;
    min-height: calc(100vh - 200px);
    grid-template-columns: 300px 1000px 300px;
    gap: 16px;
`;

export default function Profile({ profile }) {

    return (
        <Container maxWidth="lg">
            <Grid>
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
            </Grid>
        </Container>
    );
}
