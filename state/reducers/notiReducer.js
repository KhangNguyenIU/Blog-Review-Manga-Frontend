

export const NotiReducer = (state =0, action)=>{
    switch(action.type){
        case "GET_NOTI":
            return state + action.payload;

        case "UPADATE_NOTI":
            return state = action.payload
        
        default:
            return state
    }
}

export default NotiReducer;