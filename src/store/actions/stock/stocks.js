import {STOCK_FAILURE,STOCK_LOADING,STOCK_SUCCESS} from "../../types/stock";
import {GetStockInfo, GetStocks} from "../../../api/queries";

export const getStocks = () => (dispatch) => {
    dispatch({
        type: STOCK_LOADING,
    });

    return new Promise((resolve, reject) => {
        GetStocks().then(async(res)=>{
            res.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

            async function fetchMyAPI() {
                const obj = []
                for (const stock of res) {
                    const symbol = stock.abbreviation
                    const resp = await GetStockInfo({symbol})
                    resp.change = ((resp.c-resp.pc)*100/resp.pc).toPrecision(2)
                    const temp = {...stock,...resp}
                    obj.push(temp)
                    console.log(temp)
                }
                return obj
            }
            const resp = await fetchMyAPI()
            console.log(resp)
            dispatch({
                type: STOCK_SUCCESS,
                payload: resp
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
