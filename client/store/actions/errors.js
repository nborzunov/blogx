import * as types from '../types';

export const setError = (error) => async (dispatch) => {
    dispatch({
        type: types.SET_ERROR,
        payload: error,
    });

    setTimeout(
        dispatch({
            type: types.SET_ERROR,
            payload: null,
        }),
        3000
    );
};
