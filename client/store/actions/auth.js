import setAuthToken from '../../utils/setAuthToken';
import * as types from '../types';
import axios from 'axios';
import { setError } from './errors.js';

export const getUser = () => async (dispatch) => {
    try {
        const res = await axios.get('/auth');

        if (res.status === 200) {
            dispatch({
                type: types.GET_USER,
                payload: res.data,
            });
        } else {
            dispatch(setError(res));
        }
    } catch (err) {
        dispatch(setError(err));
    }
};

export const login = (formData) => async (dispatch) => {
    const body = JSON.stringify({
        email: formData.email.value,
        password: formData.password.value,
    });

    try {
        const res = await axios.post('/auth/login', body);

        if (res.status === 200) {
            dispatch({
                type: types.LOGIN_USER,
            });

            document.cookie = `token=${res.data.token}`;

            setAuthToken(res.data.token);

            dispatch(getUser());
        } else {
            dispatch(setError(res));
        }
    } catch (err) {
        dispatch(setError(err));
    }
};

export const signup = (formData) => async (dispatch) => {
    const body = JSON.stringify({
        name: formData.name,
        surname: formData.surname,
        email: formData.email.value,
        password: formData.password.value,
    });

    try {
        const res = await axios.post('/auth/signup', body);

        if (res.status === 200) {
            dispatch({
                type: types.LOGIN_USER,
            });

            document.cookie = `token=${res.data.token}`;

            setAuthToken(res.data.token);

            dispatch(getUser());
        } else {
            dispatch(setError(res));
        }
    } catch (err) {
        dispatch(setError(err));
    }
};
