import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Heading from './../UI/Heading';
import Comment from './Comment';
import axios from 'axios';

const CommentsContainer = styled.div`
    margin: 24px;
    & h1 {
        margin: 0;
    }
`;
function Comments({ post }) {
    const { auth } = useSelector((state) => state);
    const [newComment, setNewComment] = useState('');

    const [comments, setComments] = useState(post.comments);

    async function handleSubmit(e) {
        e.preventDefault();
        const body = {
            message: newComment,
        };

        const res = await axios.post(
            `http://localhost:4000/post/${post._id}/comment`,
            body
        );
        setComments(res.data);
    }
    return (
        <CommentsContainer>
            <Heading variant="h1">Comments</Heading>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit">submit</button>
            </form>

            {comments.map((comment) => (
                <Comment comment={comment} />
            ))}
        </CommentsContainer>
    );
}

export default Comments;
