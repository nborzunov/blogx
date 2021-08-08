import * as types from '../types';
import { setError } from './errors';
import * as profile from '../../api/ProfileAPI/ProfileAPI';

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await profile.getCurrentProfile();

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
        const res = await profile.updateProfile(formData);

        if (res.status === 200) {
            console.log('success');
            return;
        }
        console.log(res.error);
    } catch (err) {
        console.log(err.message);
    }
};
