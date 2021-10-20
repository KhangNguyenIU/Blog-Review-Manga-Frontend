import axios from "axios"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASEURL

export const getAllCategories = ()=> axios({
    method: 'get',
    url: '/category'
})

export const createNewCategory = (category)=> axios({
    method: 'post',
    url :'/category',
    data: category,
  
})