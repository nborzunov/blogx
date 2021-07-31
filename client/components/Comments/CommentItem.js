import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import avatar from '../../assets/images/avatar.png';
import { Avatar } from '../UI';
import CloseIcon from '@material-ui/icons/Close';

const CommentWrapper = styled.div`
    width: 100%;
    & + & {
        margin: 16px 0;
    }
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 16px;
    border-radius: 12px;
    position: relative;
`;

const CommentBody = styled.div`
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 24px;
    height: 100px;
    margin-bottom: 16px;
`;
const AvatarWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CommentBodyInfo = styled.div``;
const CommentBodyInfoName = styled.div`
    & > * {
        font-weight: bold;
    }
`;
const CommentBodyInfoText = styled.div`
    font-size: 1.1rem;
    margin-top: 4px;
`;
const CommentInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
`;
const CommentInfoInner = styled.div`
    width: 160px;
    text-align: center;
`;
const ButtonsWrapper = styled.div``;
const Button = styled.button`
    font-size: 0.9rem;
    background: none;
    border: none;
    padding: 4px;
    transition: all 0.2s ease;

    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }
    & + & {
        margin-left: 4px;
    }
`;
const ReplyHref = styled.a`
    color: blue;
    transition: 0.2s ease;
    &:hover {
        opacity: 0.8;
    }
`;

const DeleteButton = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;

    background: none;
    border: none;
    width: 40px;
    height: 40px;
    transition: all 0.2s ease;
    &:hover{
        cursor: pointer;
        opacity: 0.5;
    }
`;

export default function CommentItem({
    comment,
    setReplies,
    handleReplyClick,
    replies,
    handleDelete,
    showDeleteButton,
    isReply = false,
}) {
    return (
        <CommentWrapper id={comment._id} className="comment">
            {showDeleteButton && (
                <DeleteButton onClick={_ => handleDelete(comment._id)}>
                    <CloseIcon />
                </DeleteButton>
            )}

            <CommentBody>
                <AvatarWrapper>
                    <Avatar
                        src={
                            comment.author.avatar
                                ? comment.author.avatar
                                : avatar.src
                        }
                        size="medium"
                    />
                </AvatarWrapper>

                <CommentBodyInfo>
                    <CommentBodyInfoName>
                        <span>
                            {comment.author.name} {comment.author.surname}{' '}
                        </span>
                        {comment.repliedTo && (
                            <>
                                to{' '}
                                <ReplyHref href={`#${comment.repliedTo._id}`}>
                                    {comment.repliedTo.author.name[0] + '.'}{' '}
                                    {comment.repliedTo.author.surname}
                                </ReplyHref>
                            </>
                        )}
                    </CommentBodyInfoName>
                    <CommentBodyInfoText>{comment.text}</CommentBodyInfoText>
                </CommentBodyInfo>
            </CommentBody>
            <CommentInfo>
                <CommentInfoInner>
                    {moment(comment.date).format('Do MMMM, H:mm')}
                </CommentInfoInner>

                <ButtonsWrapper>
                    {!isReply && comment.replies.length ? (
                        <Button onClick={(e) => setReplies(!replies)}>
                            View {comment.replies.length} replies
                        </Button>
                    ) : (
                        ''
                    )}

                    <Button onClick={handleReplyClick}>Reply</Button>
                </ButtonsWrapper>
            </CommentInfo>
        </CommentWrapper>
    );
}
