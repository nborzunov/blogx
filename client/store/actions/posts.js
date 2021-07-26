import axios from 'axios';

export const createPost = (formData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        console.log(formData);
        const res = await axios.post(`/post`, formData);

        if (res.status === 200) {
            console.log('success');
        } else {
            console.log(res.error);
        }
    } catch (err) {
        console.log(err.message);
    }
};
