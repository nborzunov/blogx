import tokenService from '../../utils/tokenService';
import * as types from '../types';


const initialState = {
    token: tokenService.getToken(),
    isAuth: false,
    name: '',
    surname: '',
    email: '',
    avatar: '',
    id: null,
};

export const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.LOGIN_USER:
            tokenService.setToken(payload);
            return { ...state, isAuth: true };
        case types.GET_USER:
            return {
                ...state,
                id: payload._id,
                name: payload.name,
                surname: payload.surname,
                email: payload.email,
                avatar: payload?.avatar,
                isAuth: true,
            };
        case types.LOGOUT:
            tokenService.removeToken();
            return {
                token: null,
                isAuth: false,
                name: '',
                surname: '',
                email: '',
                avatar: '',
                id: null,
            }
        default:
            return state;
    }
};
