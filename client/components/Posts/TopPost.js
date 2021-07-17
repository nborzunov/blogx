import styled from 'styled-components';
import Image from 'next/image';
import {Heading, Link} from '../UI';

const MainPostWrapper = styled.div`
    width: 100%;
    height: 350px;
    position: relative;
`;
const StyledImage = styled(Image)`
    background: red;
    object-fit: cover;
    -webkit-filter: brightness(85%);
    z-index: 1000;
`;

const MainPostInfoContent = styled.div`
    position: absolute;
    z-index: 1020;
    width: 100%;
    & h1 {
        color: rgba(255, 255, 255, 0.95);
        overflow: hidden;
        text-overflow: ellipsis;
        width: 60%;
    }
    & h2 {
        display: inline-block;
        color: rgba(255, 255, 255, 0.9);

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; /* number of lines to show */
        line-height: 30px; /* fallback */
        max-height: 90px;
        width: 60%;
    }
    & a {
        padding: 0;
        margin-left: 24px;
    }
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    margin: 32px;
`;

export default function TopPost({ post, isPreview = false}) {
    return (
        <MainPostWrapper>

                <StyledImage src={post.previewImage} width={952} height={350} />
         
            
            <MainPostInfoContent>
                <Heading variant="h1">{post.title}</Heading>

                <Heading variant="h2">{post.subtitle}</Heading>
                {!isPreview && <Link title="Read more.." href="/" size="medium" />}
                
            </MainPostInfoContent>
        </MainPostWrapper>
    );
}
