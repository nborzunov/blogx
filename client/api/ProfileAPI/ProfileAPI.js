import axios from 'axios';

export async function getCurrentProfile(token) {
    return await axios.get(`http://localhost:4000/profile`, {
        headers: {
            'x-auth-token': token,
        },
    });
}

export async function getProfileByUserId(id) {
    return await axios.get(`http://localhost:4000/profile/${id}`);
}

export async function getProfileWithFollowers(userId) {
    return await axios.get(`http://localhost:4000/profile/${userId}/followers`);
}

export async function getProfileWithFollowing(userId) {
    return await axios.get(`http://localhost:4000/profile/${userId}/following`);
}

export async function getProfileWithPosts() {}

export async function getProfileWithComments() {}

export async function toggleFollow(userId) {
    return await axios.patch(`http://localhost:4000/profile/${userId}/togglefollow`)
}

export async function updateProfile(formData) {
    return await axios.put(`http://localhost:4000/profile`, formData);
}
