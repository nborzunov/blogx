import React, { useState, createRef } from 'react';
import styled from 'styled-components';
import TextArea from './CommentTextArea';
import CommentItem from './CommentItem';
import { useSelector } from 'react-redux';
import * as postAPI from '../../api/PostAPI/PostAPI';

const ReplyWrapper = styled.div`
    margin-top: 4px;
    margin-left: 180px;
    width: calc(100% - 180px);
    & .comment {
        margin-top: 4px;
        margin-bottom: 4px;
    }
`;

const TextAreaWrapper = styled.div`
    position: relative;
`;

const ReplyingToLabel = styled.div`
    position: absolute;
    top: 4px;
    right: 8px;
`;

function Comment({ comment, ownerId, setComments }) {
    const [replies, setReplies] = useState(Boolean(comment.replies.length));
    const [replyText, setReplyText] = useState('');
    const [replyId, setReplyId] = useState(null);
    const [replyUser, setReplyUser] = useState(null);

    const textAreaRef = createRef();

    const { isAuth, id } = useSelector((state) => state.auth);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await postAPI.createReplyToComment(
            comment.post,
            replyId ? replyId : comment._id,
            replyText
        );

        setComments(res.data);

        setReplyText('');
        setReplyId(null);
        setReplyUser(null);
        e.target.blur();

    }

    function handleKeyPress(e) {
        if (e.charCode === 13) {
            e.stopPropagation();
            handleSubmit(e);
        }
    }

    function handleReplyClick(id) {
        setReplies(true);
        setReplyId(id);
    }

    async function handleDelete(commentId) {
        const res = await postAPI.deleteComment(comment.post, commentId);
        setComments(res.data);
    }
    return (
        <>
            <CommentItem
                key={comment._id}
                id={comment._id}
                comment={comment}
                setReplies={setReplies}
                handleReplyClick={(_) => handleReplyClick(comment._id)}
                replies={replies}
                handleDelete={handleDelete}
                showDeleteButton={
                    (isAuth && ownerId === id) ||
                    (isAuth && id === comment.author._id)
                }
            />

            {replies && (
                <ReplyWrapper>
                    {comment.replies &&
                        comment.replies.map((reply) => (
                            <CommentItem
                                key={reply._id}
                                id={reply._id}
                                comment={reply}
                                setReplies={setReplies}
                                handleReplyClick={(_) => {
                                    handleReplyClick(reply._id);
                                    setReplyUser(reply.author);
                                    textAreaRef.current.focus();
                                }}
                                replies={replies}
                                handleDelete={handleDelete}
                                showDeleteButton={
                                    (isAuth && id == ownerId) ||
                                    (isAuth && id == comment.author._id)
                                }
                                isReply
                            />
                        ))}
                    <TextAreaWrapper>
                        <TextArea
                            type="text"
                            name="comment"
                            value={replyText}
                            placeholder="Add comment.."
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            ref={textAreaRef}
                        />
                        {replyUser && (
                            <ReplyingToLabel>
                                {' '}
                                replying to {replyUser.name} {replyUser.surname}
                            </ReplyingToLabel>
                        )}
                    </TextAreaWrapper>
                </ReplyWrapper>
            )}
        </>
    );
}

export default Comment;
