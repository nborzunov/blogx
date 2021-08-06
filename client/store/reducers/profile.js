import * as types from '../types';

const initialState = {
    isProfileExist: false,
    user: null,
    age: null,
    country: null,
    city: null,
    avatar: null,
    following: null,
    friends: null
};

export const profileReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type){
        case types.SET_PROFILE:
            return {
                user: payload.user,
                age: payload.age,
                country: payload.country,
                city: payload.city,
                avatar: payload.avatar,
                following: payload.following,
                friends: payload.friends
            }
        case types.CLEAR_PROFILE:
            return {
                isProfileExist: false,
                user: null,
                age: null,
                country: null,
                city: null,
                avatar: null,
                following: null,
                friends: null
            }
        default:
            return state
    }
}