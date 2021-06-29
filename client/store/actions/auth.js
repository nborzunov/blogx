import * as types from '../types';

export const getUser = (id) => async (dispatch) => {
    // request

    const user = {};
    dispatch({
        type: types.GET_USER,
        payload: user,
    });
};
