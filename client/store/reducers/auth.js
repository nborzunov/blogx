import * as types from '../types';


const getLocalStorage = () => {
    if (typeof window !== 'undefined') {
        return localStorage
    }
}
const initialState = {
    token: (getLocalStorage())?.getItem('token'),
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
            (getLocalStorage())?.setItem('token', payload);
            return { ...state, isAuth: true };
        case types.GET_USER:
            return {
                ...state,
                id: payload._id,
                name: payload.name,
                surname: payload.surname,
                email: payload.email,
                avatar: payload?.avatar,
                isAuth: true
            };
        case types.LOGOUT:
            (getLocalStorage())?.removeItem('token');
            return { isAuth: false };
        default:
            return state;
    }
};
