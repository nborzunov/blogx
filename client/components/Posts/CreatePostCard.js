import styled from 'styled-components';
import Link from 'next/link';

const PostCardWrapper = styled.div`
    height: 180px;
    box-shadow: 0px 3px 9px rgba(43, 98, 169, 0.5);
    display: flex;
    position: relative;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.01);
    &:hover {
        background: rgba(0, 0, 0, 0.03);
        .title {
            opacity: 0.8;
        }
    }
`;

const PostInfo = styled.div`
    width: 100%;
    height: 180px;
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    .title{
        display: inline-block;
        font-size: 1.25rem;
        font-weight: bold;
        color: #444;
        text-transform: uppercase;
    }
`;

export default function CreatePostCard() {
    return (
        <PostCardWrapper>
            <Link href="/post/create">
                <PostInfo>
                    <div className='title'>Create new post..</div>
                </PostInfo>
            </Link>
        </PostCardWrapper>
    );
}
