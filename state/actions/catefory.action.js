import { GET_ALL_CATEGORIES } from "../contants/category.constant"

export const getAllCategoriesAction =(categories)=>{
    return (dispatch)=>{
        dispatch({
            type:GET_ALL_CATEGORIES,
            payload:categories
        })
    }
}