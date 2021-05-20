import {LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS} from "../../types/auth";
import axiosInstance from "../../../utils/axiosInstance";

export const login = ({ password, username }) => (dispatch) => {
    dispatch({
        type: LOGIN_LOADING,
    });
    return new Promise((resolve, reject) => {
        axiosInstance()
            .post("/User/authenticate", {
                password,
                username,
            })
            .then((res) => {
                console.log(res)
                localStorage.token = res.data.token;
                localStorage.id = res.data.id
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data.id,
                });
                resolve()
            })
            .catch((err) => {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: err.response ? err.response.data : "COULD NOT CONNECT",
                });
                reject()
            });
    })

};
