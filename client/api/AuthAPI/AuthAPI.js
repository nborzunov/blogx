import axios from 'axios';

export async function getCurrentUser() {
    return await axios.get('http://localhost:4000/auth');
}

export async function login(formData) {
    const res = await axios.post('http://localhost:4000/auth/login', formData);
    return res
}

export async function signup(formData) {
    return await axios.post('http://localhost:4000/auth/signup', formData);
}
