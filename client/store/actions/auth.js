import setAuthToken from '../../utils/setAuthToken';
import * as types from '../types';
import axios from 'axios';
import { setError } from './errors.js';
import tokenService from '../../utils/tokenService';
import * as authAPI from '../../api/AuthAPI/AuthAPI';

export const getUser = () => async (dispatch) => {
    try {
        let token = tokenService.getToken();

        if (token) {
            setAuthToken(token);
        }

        const res = await authAPI.getCurrentUser();

        if (res.status == 200) {
            dispatch({
                type: types.GET_USER,
                payload: res.data,
            });
            return res.data;
        } else {
            dispatch(setError(res.data));
        }
    } catch (err) {
        console.log(err.message);
        dispatch(setError(err.message));
    }
};

export const login = (formData) => async (dispatch) => {
    try {
        const res = await await authAPI.login(formData)

        if (res.status === 200) {
            dispatch({
                type: types.LOGIN_USER,
                payload: res.data.token,
            });

            dispatch(getUser());
            return 'ok';
        } else {
            dispatch(setError(res.data.msg));
            return res.data;
        }
    } catch (err) {
        dispatch(setError(err.response.data.msg));
        return err.response.data;
    }
};

export const signup = (formData) => async (dispatch) => {
    try {
        const res =  await authAPI.signup(formData)

        if (res.status === 200) {
            dispatch({
                type: types.LOGIN_USER,
                payload: res.data.token,
            });
            dispatch(getUser());
            return 'ok';
        } else {
            dispatch(setError(res.data.msg));
            return res.data;
        }
    } catch (err) {
        dispatch(setError(err.response.data.msg));
        return err.response.data;
    }
};

export const logout = () => async (dispatch) => {
    setAuthToken();

    dispatch({
        type: types.LOGOUT,
    });
    dispatch({
        type: types.CLEAR_PROFILE,
    });
};
