import * as types from '../types';

const initialState = {
    error: null
};

export const errorReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type){
        case types.SET_RRROR:
            return {error: payload}
        default:
            return state
    }
}