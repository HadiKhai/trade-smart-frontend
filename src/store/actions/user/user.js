import {USER_ERROR,USER_LOADING,USER_SUCCESS} from "../../types/user";
import axiosInstance from "../../../utils/axiosInstance";
import {GetUserDetails} from "../../../api/queries";
import {useSelector} from "react-redux";

export const user = ({id}) => (dispatch) => {
    console.log(id)
    dispatch({
        type: USER_LOADING,
    });
    return new Promise((resolve, reject) => {
        GetUserDetails({id}).then(
            (e)=> {
                dispatch({
                    type: USER_SUCCESS,
                    payload: e,
                });
                resolve(e)
            }

        ).catch((e)=> {
            dispatch({
                type: USER_ERROR,
            });
            console.log(e)
            reject(e)
        })
    })

};
