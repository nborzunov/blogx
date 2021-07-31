import axios from 'axios';

export const createPost = (formData) => async (dispatch) => {
    try {
        // const config = {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // };
        const res = await axios.post(`/post`, formData);

        if (res.status === 200) {
            console.log('success');
            return;
        }
        console.log(res.error);
        
    } catch (err) {
        console.log(err.message);
    }
};


export const createComment = (postId, message) => async(dispatch) => {
    try{
        const res = await axios.post(
            `http://localhost:4000/post/${postId}/comment`,
            {
                message: message
            }
        );

        if(res.status === 200) {
            console.log('success');
            return res.data;
        }
        console.log(res.error)
    } catch(err) {
        console.log(err.message);
    }
}

export const createReplyToComment = (postId, replyId, message) => async(dispatch) => {
    try{
        const res = await axios.post(
            `http://localhost:4000/post/${postId}/comment/${replyId}`,
            {
                message: message,
            }
        );

        if(res.status === 200) {
            console.log('success');
            return res.data;
        }
        console.log(res.error)
    } catch(err) {
        console.log(err.message);
    }
}

export const deleteComment = (postId, commentId) => async(dispatch) => {
    try{
        const res = await axios.delete(
            `http://localhost:4000/post/${postId}/comment/${commentId}`
        );

        if(res.status === 200) {
            return res.data;
        }
        return res.error;
    } catch(err) {
        console.log(err.message);
    }
}