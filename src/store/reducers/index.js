import {combineReducers} from 'redux';
import authReducer from "./auth/reducer"
import stocksReducer from "./stocks/reducer"

export default combineReducers({
    auth:authReducer,
    stocks:stocksReducer
});
