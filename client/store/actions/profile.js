import * as types from './types';
import axios from 'axios';
import {setError} from './errors';

export const getProfile = (id) => async dispatch => {

    try{
        const res = axios.get(`/profile/${id}`);

        if (res.status === 200){
            dispatch({
                type: types.SET_PROFILE,
                payload: res.data
            })
        } else {
            setError(res.error)
        }
    } catch(err) {
        setError(err.message)
    }
}