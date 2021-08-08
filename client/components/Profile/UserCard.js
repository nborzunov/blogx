import styled from 'styled-components';
import { Avatar, Button, Link } from '../UI';
import avatar from '../../assets/images/avatar.png';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import axios from 'axios';

const Wrapper = styled.div`
    width: 100%;
    max-width: 1000px;
    height: 100px;
    border-bottom: 1px solid #aaa;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    padding: 8px 16px;
    position: relative;
    & + & {
        margin-top: 8px;
    }
`;

const Body = styled.div`
    margin: 8px 16px;
`;
const Name = styled.div`
    font-size: 1.1rem;
    margin-bottom: 4px;
`;
const Location = styled.div`
    font-size: 1rem;
`;

const MenuWrapper = styled.div`
    &:hover .menu {
        display: flex;
    }
`;
const MenuButton = styled.div`
    position: absolute;
    top: 16px;
    right: 20px;
    padding: 8px;
    margin: -8px;
    &:hover {
        cursor: pointer;
    }
`;
const Menu = styled.div`
    display: none;
    position: absolute;
    top: 44px;
    right: 12px;
    background: white;
    border-radius: 8px;
    flex-direction: column;
    border: 1px solid #888;
    z-index: 500;
`;
export default function UserCard({ profile, setProfile, isFollowing }) {

    async function handleFollow() {
        try {
            const res = await axios.patch(`http://localhost:4000/profile/${profile.user._id}/follow`)

            if(res.status == 200) {
                setProfile({...profile, following: res.data})
            }
        } catch(err) {
            console.error(err.message)
        }
    }
    return (
        <Wrapper>
            <Avatar
                size="small"
                src={profile.user.avatar ? profile.user.avatar : avatar.src}
            />
            <Body>
                <Name>
                    {profile.user.name} {profile.user.surname}
                </Name>
                <Location>
                    {profile.country}, {profile.city}
                </Location>
                <MenuWrapper>
                    <MenuButton>
                        <MoreHorizIcon />
                    </MenuButton>
                    <Menu className="menu">
                        <Link
                            size="small"
                            title={isFollowing ? 'Unfollow' : 'Follow'}
                            onClick={handleFollow}
                        />
                        <Link
                            size="small"
                            title="View Profile"
                            href={`/profile/${profile.user._id}`}
                        />
                    </Menu>
                </MenuWrapper>
            </Body>
        </Wrapper>
    );
}