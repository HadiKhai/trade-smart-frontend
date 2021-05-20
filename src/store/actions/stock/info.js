import {REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS} from "../../types/auth";
import axiosInstance from "../../../utils/axiosInstance";

export const register = ({symbols}) => (dispatch) => {
    dispatch({
        type: REGISTER_LOADING,
    });

    return new Promise((resolve, reject) => {
        axiosInstance()
            .post("/User/register", {
                email,
                password,
                userName,
                lastName,
                firstName,
            })
            .then((res) => {
                dispatch({
                    type: REGISTER_SUCCESS,
                });
                resolve();
            })
            .catch((err) => {
                dispatch({
                    type: REGISTER_ERROR,
                });
                reject()
            });
    })
};
