import axiosInstance from "../utils/axiosInstance";
import {axiosStockAPI} from "../config/axios";

const postDiscussion = ({title,stockId, description}) => {
    let req = '/Discussion'
    return new Promise ((resolve, reject) =>{

        axiosInstance()
        .post(req, {
            title,description,stockId
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
const postMessage = ({content,discussionId}) => {
    console.log("Content: "+content)
    console.log("Discussion: "+discussionId)
    let req = '/Message'
    return new Promise ((resolve, reject) =>{

        axiosInstance()
            .post(req, {
                content,discussionId
            }).then((res)=> {
            resolve(res.data)
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

const GetOwnStocks = () => {
    let req = '/Stock/Own';

    return new Promise ((resolve, reject) => {
        axiosInstance().get(req).then((res)=> {
            let result = res.data
            resolve(result)
        }).catch((err)=> {
            reject(err)
        })
    })
}

const GetUserDetails = ({id}) => {
    let req = `/User/${id}`;

    console.log(req)
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

const GetTrade = () => {

    let req = "/Trade/Own"

    return new Promise((resolve, reject) => {
        axiosInstance().get(req).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

const PostTrade = ({type,stockId,quantity}) => {

    let req = "/Trade"

    return new Promise((resolve, reject) => {
        axiosInstance().post(req,{
            type,stockId,quantity
        }).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}

const GetStockNews = ({symbol,from,to}) => {

    let req = `company-news?symbol=${symbol}&from=${from}&to=${to}&token=c2ipksaad3i8gi7prg70`
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
    GetStockNews,
    postDiscussion,
    CheckEmail,
    GetDiscussions,
    GetDiscussion,
    GetDiscussionMessages,
    GetUserDetails,
    postMessage,
    GetTrade,
    GetOwnStocks,
    PostTrade
};
