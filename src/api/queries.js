import axiosInstance from "../utils/axiosInstance";
import {axiosStockAPI} from "../config/axios";

const postDiscussion = ({title,stockId}) => {
    let req = '/Discussion'
    return new Promise ((resolve, reject) =>{

        axiosInstance()
        .post(req, {
            title,stockId
        }).then((res)=> {
            resolve(res.data)
        }).catch((err)=> {
            reject(err)
        })
    })
}
const CheckEmail = ({email}) => {
    let req= '/User/check-email/';
    return new Promise ((resolve, reject) =>{
        axiosInstance().get(req,{
            params:{
                email
            }}).then((res)=> {
                let result = res.data
                resolve(result)
        }).catch((err)=> {
            reject(err)
        })
    })
}

const CheckUsername = ({username}) => {
    let req= '/User/check-username/';
    return new Promise ((resolve, reject) =>{
        axiosInstance().get(req,{
            params:{
                username
            }}).then((res)=> {
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

const GetStockSymbol = ({name}) => {

    let req = `/search?q=${name}&token=c2ipksaad3i8gi7prg70`

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
    GetStockInfo,
    GetStockSymbol,
    postDiscussion
};
