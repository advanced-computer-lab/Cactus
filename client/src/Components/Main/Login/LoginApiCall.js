import axios from 'axios'

export const loginCall = async (user,dispatch)=>{
    dispatch({type:"LOGIN_START"});
    try {
        const response = await axios.post('/Authentication/Login',user)
        dispatch({type:"LOGIN_SUCCESS", payload:response.data});
    } catch (error) {
        dispatch({type:"LOGIN_FAILED",payload:error});
    }
}