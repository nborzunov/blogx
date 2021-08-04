import styled from 'styled-components';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import avatar from '../../assets/images/avatar.png';
import { Avatar } from '../UI';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LanguageIcon from '@material-ui/icons/Language';
import { Button } from '../UI';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

const ProfileCard = styled.div`
    margin-top: 16px;
    width: 100%;
    box-shadow: 0px 8px 30px -10px rgba(13, 28, 39, 0.3);
    background: #fff;
    border-radius: 12px;
    position: static;
    z-index: 900;
    font-family: 'Quicksand', sans-serif;
    display: flex;
    justify-content: center;
`;

const ProfileContent = styled.div`
    margin: 20px;
    transition: all 0.3s;
    display: flex;
`;

const ProfileInfo = styled.div`
    margin: 32px;
`;

const TopWrapper = styled.div`
    display: flex;
    align-items: baseline;
    column-gap: 32px;
`;

const Name = styled.div`
    font-weight: 700;
    font-size: 24px;
    color: #6944ff;
`;

const Location = styled.div`
    display: flex;
    justify-content: start;
    font-size: 18px;
    font-weight: 600;
    margin-top: 12px;
    & .MuiSvgIcon-root {
        display: inline-flex;
        margin-right: 3px;
        color: #6944ff;
    }
`;

const InfoBox = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: flex-start;
`;

const InfoItem = styled.div`
    margin: 16px 0;
    @media screen and (max-width: 768px) {
        margin: 10px 0;
    }
    display: flex;
    & + & {
        margin-left: 14px;
    }
`;

const InfoItemTitle = styled.div`
    font-weight: 700;
    font-size: 1rem;
    color: #324e63;
`;

const InfoItemText = styled.div`
    font-size: 1rem;
    padding-left: 3px;
    font-weight: 500;
    text-transform: lowercase;
`;

const SocialsBox = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const SocialsItem = styled.a`
    width: 50px;
    height: 50px;
    margin: 10px 0;
    & + & {
        margin-left: 12px;
    }
    border-radius: 50%;
    color: #fff;
    background: #405de6;
    box-shadow: 0px 7px 30px rgba(43, 98, 169, 0.5);
    position: relative;
    font-size: 21px;
    flex-shrink: 0;
    transition: all 0.3s;

    & > .MuiSvgIcon-root {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.3s;
    }

    &:hover > .MuiSvgIcon-root {
        opacity: 0.7;
    }

    &.facebook {
        background: linear-gradient(45deg, #3b5998, #0078d7);
        box-shadow: 0px 4px 30px rgba(43, 98, 169, 0.5);
    }

    &.twitter {
        background: linear-gradient(45deg, #1da1f2, #0e71c8);
        box-shadow: 0px 4px 30px rgba(19, 127, 212, 0.7);
    }

    &.instagram {
        background: linear-gradient(
            45deg,
            #405de6,
            #5851db,
            #833ab4,
            #c13584,
            #e1306c,
            #fd1d1d
        );
        box-shadow: 0px 4px 30px rgba(120, 64, 190, 0.6);
    }

    &.website {
        background: linear-gradient(45deg, #d5135a, #f05924);
        box-shadow: 0px 4px 30px rgba(223, 45, 70, 0.6);
    }
`;

const ButtonBox = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    margin: auto 0;
`;

export default function ProfileHeader({ profile }) {
    if (!profile) {
        return <h1>Profile not found</h1>;
    }

    return (
        <>
            <ProfileCard>
                <ProfileContent>
                    <Avatar
                        size="large"
                        src={profile.avatar ? profile.avatar : avatar.src}
                        alt="profile image"
                    />
                    <ProfileInfo>
                        {profile.user && (
                            <TopWrapper>
                                <div>
                                    <Name>
                                        {profile?.user?.name}{' '}
                                        {profile?.user?.surname}
                                    </Name>
                                    {profile?.country && profile?.city && (
                                        <Location>
                                            <LocationOnIcon /> {profile.country}
                                            , {profile.city}
                                        </Location>
                                    )}
                                </div>

                                <ButtonBox>
                                    <Button>Follow</Button>
                                    <Button variant="icon">
                                        <ReportProblemIcon />
                                    </Button>
                                    <Button variant="icon">
                                        <MoreHorizIcon />
                                    </Button>
                                </ButtonBox>
                            </TopWrapper>
                        )}
                        <InfoBox>
                            <InfoItem>
                                <InfoItemTitle>
                                    {profile.followers}
                                </InfoItemTitle>
                                <InfoItemText>Followers</InfoItemText>
                            </InfoItem>

                            <InfoItem>
                                <InfoItemTitle>
                                    {profile.following}
                                </InfoItemTitle>
                                <InfoItemText>Following</InfoItemText>
                            </InfoItem>

                            <InfoItem>
                                <InfoItemTitle>
                                    {profile.posts.length}
                                </InfoItemTitle>
                                <InfoItemText>Posts</InfoItemText>
                            </InfoItem>

                            <InfoItem>
                                <InfoItemTitle>
                                    {profile.comments}
                                </InfoItemTitle>
                                <InfoItemText>Comments</InfoItemText>
                            </InfoItem>
                        </InfoBox>
                        <SocialsBox>
                            {profile.twitter && (
                                <SocialsItem
                                    href={profile.twitter}
                                    className="twitter"
                                >
                                    <TwitterIcon />
                                </SocialsItem>
                            )}
                            {profile.facebook && (
                                <SocialsItem
                                    href={profile.facebook}
                                    className="facebook"
                                >
                                    <FacebookIcon />
                                </SocialsItem>
                            )}
                            {profile.instagram && (
                                <SocialsItem
                                    href={profile.instagram}
                                    className="instagram"
                                >
                                    <InstagramIcon />
                                </SocialsItem>
                            )}
                            {profile.website && (
                                <SocialsItem
                                    href={profile.website}
                                    className="website"
                                >
                                    <LanguageIcon />
                                </SocialsItem>
                            )}
                        </SocialsBox>
                    </ProfileInfo>
                </ProfileContent>
            </ProfileCard>
        </>
    );
}
