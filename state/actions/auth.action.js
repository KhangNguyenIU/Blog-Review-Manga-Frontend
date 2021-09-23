import { ADD_USER } from "../contants/auth.contant"


export const addUser = (user) => {
    return (dispatch)=>{
        dispatch({
            type: ADD_USER,
            payload: user
        })
    }
}