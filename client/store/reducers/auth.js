import * as types from '../types';

const initialState = {
    isAuth: false,
    name: '',
    surname: '',
    email: '',
    avatar: '',
    id: null,
};

export const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case types.LOGIN_USER:
            return { ...state, isAuth: true };
        case types.GET_USER:
            return {
                ...state,
                id: payload._id,
                name: payload.name,
                surname: payload.surname,
                email: payload.email,
                avatar: payload?.avatar,
            };
        case types.LOGOUT:
            return { isAuth: null };
        default:
            return state;
    }
};
