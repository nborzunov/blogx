import axios from 'axios';

export async function getPostById(postId) {
    return await axios.get(`http://localhost:4000/post/${postId}`);
}

export async function likePost(postId) {
    return await axios.put(`http://localhost:4000/post/${postId}/like`);
}

export async function dislikePost(postId) {
    return await axios.put(`http://localhost:4000/post/${postId}/dislike`);
}

export async function createPost(formData) {
    return await axios.post(`http://localhost:4000/post`, formData);
}

export async function createComment(postId, message) {
    return await axios.post(`http://localhost:4000/post/${postId}/comment`, {
        message: message,
    });
}

export async function createReplyToComment(postId, replyId, message) {
    return await axios.post(
        `http://localhost:4000/post/${postId}/comment/${replyId}`,
        {
            message: message,
        }
    );
}

export async function deleteComment(postId, commentId) {
    return await axios.delete(
        `http://localhost:4000/post/${postId}/comment/${commentId}`
    );
}
