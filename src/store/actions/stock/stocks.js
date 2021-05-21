import {STOCK_FAILURE,STOCK_LOADING,STOCK_SUCCESS} from "../../types/stock";
import {GetStocks} from "../../../api/queries";

export const getStocks = () => (dispatch) => {
    dispatch({
        type: STOCK_LOADING,
    });

    return new Promise((resolve, reject) => {
        GetStocks().then((res)=>{
            res.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            dispatch({
                type: STOCK_SUCCESS,
                payload: res
            });
            resolve(res);
        }).catch((err)=> {
            dispatch({
                type: STOCK_FAILURE,
            });
            reject(err)
        })
    })
};
