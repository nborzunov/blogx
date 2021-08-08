import * as types from '../types';

const initialState = {
    isProfileExist: false,
    id: null,
    age: null,
    user: null,
    country: null,
    city: null,
};

export const profileReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type){
        case types.SET_PROFILE:
            return {
                isProfileExist: true,
                id: payload._id,
                user: payload.user,
                age: payload.age,
                country: payload.country,
                city: payload.city,
            }
        case types.CLEAR_PROFILE:
            return {
                isProfileExist: false,
                id: null,
                age: null,
                user: null,
                country: null,
                city: null,
            }
        default:
            return state
    }
}