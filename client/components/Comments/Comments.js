import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Heading from './../UI/Heading';
import Comment from './TopComment';
import TextArea from './CommentTextArea';
import {createComment} from '../../store/actions/posts';

const CommentsContainer = styled.div`
    padding: 24px;
    & h1 {
        margin: 0;
    }
    position: relative;
    background-color: #f0f2fa;
    border-radius: 12px;
`;

function Comments({ post }) {
    const [newComment, setNewComment] = useState('');

    const [comments, setComments] = useState(post.comments);

    const dispatch = useDispatch();

    async function handleSubmit(e) {
        e.preventDefault();
        const comments = await dispatch(createComment(post._id, newComment));

        e.target.blur();
        setNewComment('');
        setComments(comments);
    }

    function handleKeyPress(e) {
        if (e.charCode === 13) {
            e.stopPropagation();
            handleSubmit(e);
        }
    }

    return (
        <CommentsContainer>
            <Heading variant="h1">Comments</Heading>

            <TextArea
                type="text"
                name="comment"
                value={newComment}
                placeholder="Add comment.."
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
            />

            {comments.map((comment) => (
                <Comment
                    comment={comment}
                    ownerId={post.author._id}
                    key={comment._id}
                    setComments={setComments}
                />
            ))}
        </CommentsContainer>
    );
}

export default Comments;
