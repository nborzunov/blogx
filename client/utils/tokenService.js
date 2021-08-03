import cookieService from "./cookieService";

const runClientSideCallback = (callback, values) => {
    if (typeof window !== 'undefined') {
        return callback(...values);
    }
};

class TokenService {
    getToken() {
        return runClientSideCallback(cookieService.getCookie, ['token']);
    }

    setToken(token) {
        runClientSideCallback(cookieService.setCookie, ['token', token, {
            path: '/'
        }]);
    }

    removeToken() {
        runClientSideCallback(cookieService.deleteCookie, ['token']);
    }
}

export default new TokenService();