import * as types from '../types';
import axios from 'axios';
import { setError } from './errors';

export const getCurrentProfile = (token) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:4000/profile/`);

        if (res.status === 200) {

            dispatch({
                type: types.SET_PROFILE,
                payload: res.data,
            });

            return res.data;
        } else {
            setError(res.error);

        }
    } catch (err) {
        setError(err.message);
    }
};

export const updateProfile = (formData) => async (dispatch) => {
    try {
        const res = await axios.put(`http://localhost:4000/profile`, formData);

        if (res.status === 200) {
            console.log('success');
            return;
        }
        console.log(res.error);
        
    } catch (err) {
        console.log(err.message);
    }
};