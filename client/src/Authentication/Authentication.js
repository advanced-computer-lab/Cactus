import { setCookie } from './Cookies'
import { setLocalStorage } from './LocalStorage'

export const setAuthentication = (token, user) => {
    setCookie('token', token);
    setLocalStorage('user', user)
}