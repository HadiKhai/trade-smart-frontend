import {combineReducers} from 'redux';
import authReducer from "./auth/reducer"
import stocksReducer from "./stocks/reducer"
import userReducer from "./user/reducer"

export default combineReducers({
    auth:authReducer,
    stocks:stocksReducer,
    user:userReducer
});
