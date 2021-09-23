import {combineReducers} from 'redux'
import NotiReducer from './notiReducer'
import UserReducer from './userReducer';

const reducers = combineReducers({
    noti : NotiReducer,
    user: UserReducer
})

export default reducers;