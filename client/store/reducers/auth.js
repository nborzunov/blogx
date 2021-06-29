import * as types from '../types';

const initialState = {
    isAuth: false,
    name: '',
    surname: '',
    avatar: '',
    id: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
