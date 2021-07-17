import axios from 'axios';

export const createPost = (formData) => async dispatch => {
    console.log(formData)
    try{
        const res = await axios.post(`/post`, formData);

        if (res.status === 200){
            console.log('success')
        } else {
            console.log(res.error)
        }
    } catch(err) {
        console.log(err.message)
    }
}