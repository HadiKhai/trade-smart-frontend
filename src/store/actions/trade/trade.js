import {TRADE_FAILURE,TRADE_LOADING,TRADE_SUCCESS} from "../../types/stock";
import {GetTrade} from "../../../api/queries";

export const getTrades = () => (dispatch) => {
    dispatch({
        type: TRADE_LOADING,
    });

    return new Promise((resolve, reject) => {
        GetTrade().then((res)=>{
            dispatch({
                type: TRADE_SUCCESS,
                payload: res
            });
            resolve(res);
        }).catch((err)=> {
            dispatch({
                type: TRADE_FAILURE,
            });
            reject(err)
        })
    })
};
