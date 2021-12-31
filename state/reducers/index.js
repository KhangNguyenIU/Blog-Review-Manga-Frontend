import {combineReducers} from 'redux'
import { CategoryReducer } from './CategoryReducer';
import NotiReducer from './notiReducer'
import UserReducer from './userReducer';

const reducers = combineReducers({
    noti : NotiReducer,
    user: UserReducer,
    categories: CategoryReducer
})

export default reducers;