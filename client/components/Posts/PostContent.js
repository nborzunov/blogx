import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';
import { Avatar } from '../UI';
import moment from 'moment';

const PostContentWrapper = styled.div`
    margin: 24px;
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    column-gap: 4px;
    font-size: 0.9rem;
`;

const ProfileLink = styled.a`
    display: flex;
    align-items: center;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const DateText = styled.div``;
export default function PostContent({ post }) {
    return (
        <PostContentWrapper>
            <InfoContainer>
                <ProfileLink
                    target="_blank"
                    href={`/profile/${post.author._id}`}
                >
                    <Avatar size="extrasmall" src={post.author.avatar} />{' '}
                    {post.author.name} {post.author.surname}
                </ProfileLink>
                <DateText>
                    at {moment(post.date).format('Do MMMM, H:mm')}
                </DateText>
            </InfoContainer>
            <Markdown>{post.body}</Markdown>
        </PostContentWrapper>
    );
}
