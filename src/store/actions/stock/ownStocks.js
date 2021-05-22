import {STOCK_OWN_FAILURE,STOCK_OWN_LOADING,STOCK_OWN_SUCCESS} from "../../types/stock";
import {GetOwnStocks} from "../../../api/queries";

export const getOwnStocks = () => (dispatch) => {
    dispatch({
        type: STOCK_OWN_LOADING,
    });

    return new Promise((resolve, reject) => {
        GetOwnStocks().then(async(res)=>{
            res.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            dispatch({
                type: STOCK_OWN_SUCCESS,
                payload: res
            });
            resolve(res);
        }).catch((err)=> {
            dispatch({
                type: STOCK_OWN_FAILURE,
            });
            reject(err)
        })
    })
};
