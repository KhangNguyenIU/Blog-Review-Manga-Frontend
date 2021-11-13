import axios from "axios"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASEURL


export const isAuth = () => axios({
    method: 'post',
    url: '/auth',
    headers: {
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true
})

export const googleLogin = (tokenId) => axios({
    method: "post",
    url: '/auth/google-login',
    headers: {
        'Accept': '*/*',
        // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true,
    data: tokenId
})



export const signin = (user) => axios({
    method: 'post',
    url: 'auth/signin',
    headers: {
        'Accept': '*/*',
        // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials:true,
    data: user
})

export const signup = user => axios({
    method: 'post',
    url: 'auth/signup',
    headers: {
        'Accept': '*/*'
    },
    data: user
})

export const signout = () => axios({
    method:'get',
    url : '/auth/signout',
    withCredentials: true
})

export const test = () => axios({
    method: 'get',
    url: 'auth/test',
    withCredentials: true
})

export const testSetCookie =()=>axios({
    method:'post',
    url :'/auth/test'
})
