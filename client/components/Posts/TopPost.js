import styled from 'styled-components';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Heading, Link } from '../UI';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import VisibilityIcon from '@material-ui/icons/Visibility';
import * as postAPI from '../../api/PostAPI/PostAPI';

const MainPostWrapper = styled.div`
    width: 100%;
    position: relative;
    height: 350px;
`;
const StyledImage = styled(Image)`
    object-fit: cover;
    -webkit-filter: brightness(85%);
    height: 350px;
`;
const CasualImage = styled.img`
    width: 952px;
    height: 350px;
    object-fit: cover;
    -webkit-filter: brightness(85%);
`;
const MainPostInfoContent = styled.div`
    position: absolute;
    width: 100%;
    & h1 {
        color: rgba(255, 255, 255, 0.95);
        overflow: hidden;
        text-overflow: ellipsis;
        width: 60%;
        text-shadow: 3px 1px 4px rgba(0, 0, 0, 0.5);
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
        text-shadow: 3px 1px 4px rgba(0, 0, 0, 0.5);
    }
    & a {
        padding: 0;
        margin-left: 24px;
        text-shadow: 3px 1px 4px rgba(0, 0, 0, 0.5);
    }
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    margin: 32px;
`;

const InfoBox = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 30px;
    width: calc(100% - 72px);
    margin: 18px 36px;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    & > div {
        display: flex;
        flex-direction: row;
    }
    column-gap: 12px;
    & * {
        color: rgba(255, 255, 255, 0.9);
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    font-weight: bold;
    & * {
        text-shadow: 3px 1px 4px rgba(0, 0, 0, 0.5);
    }
    & .text {
        font-size: 1rem;
        text-shadow: 3px 1px 4px rgba(0, 0, 0, 0.5);
    }
`;

const Button = styled.button`
    background: none;
    border: none;
    margin: 4px;
    padding: 4px 8px;
    transition: all 0.2s ease;
    &:hover {
        cursor: pointer;
        opacity: 0.9;
        & * {
            opacity: 0.9;
        }
    }
    ${(props) =>
        props.active &&
        `
    & *{
        color: rgb(108, 68, 252);
    }
    `}
`;

const ViewWrapper = styled.div`
    margin: 4px;
    padding: 4px 8px;
    font-size: 1rem;
    display: flex;
    align-items: center;
    width: 24px;
    height: 27px;
    box-sizing: content-box;
    & * {
        margin: 4px;
        width: 24px;
        height: 27px;
    }
`;
export default function TopPost({ post, setPost, isPreview = false }) {
    const [image, setImage] = useState(null);

    const { id } = useSelector((state) => state.auth);

    useEffect(() => {
        if (typeof post.previewImage !== 'string') {
            const blob = new Blob([post.previewImage], { type: 'image/png' });
            const img = URL.createObjectURL(blob);

            setImage(img);
        } else {
            setImage(post.previewImage);
        }
    }, [post.previewImage]);

    async function likePost() {
        const res = await postAPI.likePost(post._id);

        setPost(res.data);
    }
    async function dislikePost() {
        const res = await postAPI.dislikePost(post._id);

        setPost(res.data);
    }
    return (
        <MainPostWrapper>
            {typeof post.previewImage !== 'string' ? (
                <>{image && <CasualImage src={image} />}</>
            ) : (
                <>
                    {image && (
                        <StyledImage src={image} width={1000} height={350} />
                    )}
                </>
            )}
            {post.liked && (
                <InfoBox>
                    <div>
                        <ButtonWrapper>
                            <Button
                                variant="icon"
                                onClick={likePost}
                                active={post.liked.includes(id)}
                            >
                                <ThumbUpIcon />
                            </Button>
                            <div className="text">
                                {post.liked.length} likes
                            </div>
                        </ButtonWrapper>
                        <ButtonWrapper>
                            <Button
                                variant="icon"
                                onClick={dislikePost}
                                active={post.disliked.includes(id)}
                            >
                                <ThumbDownIcon />
                            </Button>
                            <div className="text">
                                {post.disliked.length} dislikes
                            </div>
                        </ButtonWrapper>
                    </div>

                    <ButtonWrapper>
                        <ViewWrapper>
                            <VisibilityIcon />
                        </ViewWrapper>
                        <div className="text">{post.views} views</div>
                    </ButtonWrapper>
                </InfoBox>
            )}

            <MainPostInfoContent>
                <Heading variant="h1">{post.title}</Heading>

                <Heading variant="h2">{post.subtitle}</Heading>

                {!isPreview && (
                    <Link href={`/post/${post._id}`} size="medium">
                        Read more..
                    </Link>
                )}
            </MainPostInfoContent>
        </MainPostWrapper>
    );
}
