import {combineReducers} from 'redux';
import authReducer from "./auth/reducer"
import stocksReducer from "./stocks/reducer"
import userReducer from "./user/reducer"
import tradeReducer from "./trade/reducer"
export default combineReducers({
    auth:authReducer,
    stocks:stocksReducer,
    user:userReducer,
    trade:tradeReducer
});
