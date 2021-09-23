 const UserReducer = (state = {}, action)=>{
    switch (action.type) {
        case "GET_USER":
            return state
        case "ADD_USER":
            state = action.payload
            return state
        case "DELETE_USER":
            state = {}
            return state
        default:
            return state;
    }
}

export default UserReducer