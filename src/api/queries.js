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
const GetDiscussionMessages = (discussionId, pagenumber) => {
    let req = `/Message/Discussion/${discussionId}/${pagenumber}`
    return new Promise ((resolve, reject) =>{
        axiosInstance().get(req).then((res)=> {
            let result = res.data
            resolve(result)
        }).catch((err)=> {
            reject(err)
        })
    })
}

const GetDiscussion = (discussionId) => {
    let req = `/Discussion/${discussionId}`
    return new Promise ((resolve, reject) =>{
        axiosInstance().get(req).then((res)=> {
            let result = res.data
            resolve(result)
        }).catch((err)=> {
            reject(err)
        })
    })
}


const GetDiscussions = ({stockId, search}) => {
    let req = '/Discussion/All'
    return new Promise ((resolve, reject) =>{
        axiosInstance()
            .post(req, {
                stockId,search
            }).then((res)=> {
            resolve(res.data)
        }).catch((err)=> {
            reject(err)
        })
    })
}
const CheckEmail = (email) => {
    let req= '/User/check-email/'+email;
    return new Promise ((resolve, reject) =>{
        axiosInstance().get(req).then((res)=> {
                let result = res.data
                resolve(result)
        }).catch((err)=> {
            reject(err)
        })
    })
}

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
    postDiscussion,
    CheckEmail,
    GetDiscussions,
    GetDiscussion,
    GetDiscussionMessages,
};
