
export const CategoryReducer =(state=[], action)=>{
    switch(action.type){
        case 'GET_ALL_CATEGORIES': 
            state = action.payload
            return state
        case 'CLEAR':
            state = []
            return state
        default:
            return state
    }
}

export default CategoryReducer