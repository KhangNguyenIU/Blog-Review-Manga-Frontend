import axios from "axios"

// const API =axios.create({baseURL: process.env.NEXT_PUBLIC_BASEURL})
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASEURL
export const createBlog = (blog) => axios({
    method: 'post',
    url:  '/blogs',
    withCredentials:true,
    data:blog
})

export const getBlogs =(page, limit) => axios({
    method: 'get',
    url: `/blogs?page=${page}&limit=${limit}`
})

export const getAllCategories = ()=> axios({
    method: 'get',
    url: '/category'
})

export const fetchBlogById = (id)=> axios({
    method: 'get',
    url: '/blogs/'+ id,
})

export const deleteBlogById = (id)=> axios({
    method: 'delete',
    url: '/blogs/' +id,
    withCredentials: true
})

export const getTotalBlogsNumber = ()=> axios({
    method : 'get',
    url: 'blogs/total/page'
})