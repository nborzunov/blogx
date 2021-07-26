import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';

const PostContentWrapper = styled.div`
    margin: 24px;
`;
export default function PostContent({ post }) {
    return (
        <PostContentWrapper>
            <Markdown>{post.body}</Markdown>
        </PostContentWrapper>
    );
}
