import moment from 'moment';
import styled from 'styled-components';
import { Heading, Link } from '../UI';
import Image from 'next/image';

const PostCardWrapper = styled.div`
    height: 180px;
    box-shadow: 0px 3px 9px rgba(43, 98, 169, 0.5);
    display: flex;
`;

const PostInfo = styled.div`
    width: 316px;
    height: 180px;
    padding: 16px;
    & h5 {
        margin: 4px 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 90%;
    }
    & h6 {
        color: #666;
        margin: 4px 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; /* number of lines to show */
        line-height: 20px; /* fallback */
        max-height: 60px;
        width: 80%;
    }
    & a {
        margin: 4px 8px;
        padding: 0;
    }
`;
const PostInfoDate = styled.div`
    & h6 {
        color: #888;
    }
`;

const StyledImage = styled(Image)`
    background: red;
    object-fit: cover;
    -webkit-filter: brightness(90%);
    z-index: 1000;
`;

export default function PostCard({ post }) {
    return (
        <PostCardWrapper>
            <PostInfo>
                <Heading variant="h5">{post.title}</Heading>

                <Heading variant="h6">{post.subtitle}</Heading>

                <PostInfoDate>
                    <Heading variant="h6">
                        {moment().startOf(Date.parse(post.date)).fromNow()}
                    </Heading>
                </PostInfoDate>

                <Link
                    src="/"
                    title="Read more.."
                    href={`/post/${post._id}`}
                    size="small"
                />
            </PostInfo>
            <StyledImage src={post.previewImage} width={150} height={140} />
        </PostCardWrapper>
    );
}
