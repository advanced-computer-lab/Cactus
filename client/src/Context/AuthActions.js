export const LoginStart = (userCred) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (userInfo) => ({
    type: "LOGIN_SUCCESS",
    payload: userInfo,
});

export const LoginFailed = (error) => ({
    type: "LOGIN_FAILED",
    payload: error
});