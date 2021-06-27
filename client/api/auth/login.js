import axios from 'axios';

export async function loginUser(formData) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify(formData);

    try {
        const res = await axios.post('/login', body, config);

        console.log(res.data)
        // localStorage.setItem('token', res.data.token)
        return res.data;
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            console.error(errors);
        }
    }
}
