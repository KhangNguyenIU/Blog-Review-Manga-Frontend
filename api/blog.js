import axios from "axios"

// const API =axios.create({baseURL: process.env.NEXT_PUBLIC_BASEURL})
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASEURL
export const createBlog = (blog) => axios({
    method: 'post',
    url:  '/blogs',
    headers: {
        'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1Y2VtYmVyMSIsImlhdCI6MTYzMTg0OTYxNiwiZXhwIjoxNjMxOTM2MDE2fQ.hYyccmkNeojPfNyk01yzFZIK2PHbM7bvUZM3xr26AqI',
        'Accept' : '*/*',
        // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    data:blog
})


export const fetchBlogById = (id)=> axios({
    method: 'get',
    url: '/blogs/'+ id,
})