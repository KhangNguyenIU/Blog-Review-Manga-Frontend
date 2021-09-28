import axios from "axios"

// const API =axios.create({baseURL: process.env.NEXT_PUBLIC_BASEURL})
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASEURL
export const createBlog = (blog) => axios({
    method: 'post',
    url:  '/blogs',
    withCredentials:true,
    data:blog
})

export const getBlogs =() => axios({
    method: 'get',
    url: '/blogs'
})

export const getAllCategories = ()=> axios({
    method: 'get',
    url: '/category'
})

export const fetchBlogById = (id)=> axios({
    method: 'get',
    url: '/blogs/'+ id,
})