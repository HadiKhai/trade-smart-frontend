import axiosInstance from "../utils/axiosInstance";
import {axiosStockAPI} from "../config/axios";


const CheckUsername = (username) => {
    let req= '/User/check-username/'+username;
    return new Promise ((resolve, reject) =>{
        axiosInstance().get(req).then((res)=> {
                let result = res.data
                resolve(result)
        }).catch((err)=> {
            reject(err)
        })
    })

}

const GetStocks = () => {
    let req = '/Stock';

    return new Promise ((resolve, reject) => {
        axiosInstance().get(req).then((res)=> {
            let result = res.data
            resolve(result)
        }).catch((err)=> {
            reject(err)
        })
    })
}

const GetStockInfo = ({symbol}) => {

    let req = `/quote?symbol=${symbol}&token=c2ipksaad3i8gi7prg70`

    return new Promise((resolve, reject) => {
        axiosStockAPI.get(req).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export {
    CheckUsername,
    GetStocks,
    GetStockInfo
};
