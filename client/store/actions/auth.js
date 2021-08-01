import setAuthToken from '../../utils/setAuthToken';
import * as types from '../types';
import axios from 'axios';
import { setError } from './errors.js';

export const getUser = () => async (dispatch) => {
    try {
        let token = localStorage.getItem('token')
        if(token) {
            setAuthToken(token);
        }

        const res = await axios.get('http://localhost:4000/auth');

        if (res.status === 200) {
            dispatch({
                type: types.GET_USER,
                payload: res.data,
            });
        } else {
            dispatch(setError(res.data.msg));
        }
    } catch (err) {
        dispatch(setError(err.response.data.msg));
    }
};

export const login = (formData) => async (dispatch) => {
    const body = JSON.stringify({
        email: formData.email,
        password: formData.password,
    });

    try {
        const res = await axios.post('http://localhost:4000/auth/login', body);

        if (res.status === 200) {
            dispatch({
                type: types.LOGIN_USER,
                payload: res.data.token
            });

            dispatch(getUser());
            return 'ok';
        } else {
            dispatch(setError(res.data.msg));
            return res.data
        }
        
    } catch (err) {
        dispatch(setError(err.response.data.msg));
        return err.response.data;
    }
};

export const signup = (formData) => async (dispatch) => {
    const body = JSON.stringify({
        name: formData.firstName,
        surname: formData.lastName,
        email: formData.email,
        password: formData.password,
    });

    try {
        const res = await axios.post('/auth/signup', body);

        if (res.status === 200) {
            dispatch({
                type: types.LOGIN_USER,
                payload: res.data.token
            });
            dispatch(getUser());
            return 'ok';
        } else {
            dispatch(setError(res.data.msg));
            return res.data
        }

    } catch (err) {
        dispatch(setError(err.response.data.msg));
        return err.response.data;
    }
};
